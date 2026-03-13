import {
  buildImageTransformFingerprint,
  getImageTransformRelationID,
  getImageTransformRelationScalarID,
  getImageTransformSourceVersion,
  normalizeImageTransformCrop,
  unwrapImageTransformRelation,
} from './fingerprint.js';

import type { ImageTransformOwnerKind } from './types.js';
import type {
  ImageTransformPresetDefinition,
  ImageTransformPresetValue,
  ImageTransformRelationValue,
} from '../../fields/image-transform/index.js';
import type { PayloadRequest } from 'payload';

const isAbsoluteURL = (value: string): boolean => /^https?:\/\//.test(value);

const resolveAbsoluteURL = (req: PayloadRequest, url: string): string => {
  if (isAbsoluteURL(url)) {
    return url;
  }

  const requestOrigin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const forwardedProtocol = req.headers.get('x-forwarded-proto');
  const forwardedHost =
    req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  let requestURL: URL | undefined;
  let refererURL: URL | undefined;

  try {
    requestURL = req.url ? new URL(req.url) : undefined;
  } catch {
    requestURL = undefined;
  }

  try {
    refererURL = referer ? new URL(referer) : undefined;
  } catch {
    refererURL = undefined;
  }

  const base =
    req.payload.config.serverURL ??
    req.origin ??
    requestOrigin ??
    refererURL?.origin ??
    (forwardedHost
      ? `${forwardedProtocol ?? requestURL?.protocol.replace(/:$/, '') ?? 'http'}://${forwardedHost}`
      : undefined) ??
    (requestURL ? `${requestURL.protocol}//${requestURL.host}` : undefined);

  if (!base) {
    throw new Error(
      `Unable to resolve absolute URL for source asset "${url}".`,
    );
  }

  return new URL(url, base).toString();
};

const parseAspectRatio = (aspectRatio: string): number => {
  const [width, height] = aspectRatio.split(':').map((part) => Number(part));

  if (
    !width ||
    !height ||
    !Number.isFinite(width) ||
    !Number.isFinite(height)
  ) {
    return 1;
  }

  return width / height;
};

const getEffectiveZoom = ({
  aspectRatio,
  height,
  width,
  zoom,
}: {
  aspectRatio: number;
  height: number;
  width: number;
  zoom: number;
}): number => {
  const imageAspect = height / width;
  const coverScale = Math.max(1, 1 / (aspectRatio * imageAspect));

  return Math.max(1, zoom / coverScale);
};

const computeCropRegion = ({
  aspectRatio,
  crop,
  height,
  width,
}: {
  aspectRatio: string;
  crop: Pick<ImageTransformPresetValue, 'crop'>['crop'];
  height: number;
  width: number;
}) => {
  const normalizedCrop = normalizeImageTransformCrop(crop);
  const ratio = parseAspectRatio(aspectRatio);
  const zoom = getEffectiveZoom({
    aspectRatio: ratio,
    height,
    width,
    zoom: normalizedCrop.zoom,
  });
  const maxWidth = Math.floor(width / zoom);
  const maxHeight = Math.floor(height / zoom);
  const cropWidth = Math.max(
    1,
    Math.min(maxWidth, Math.floor(maxHeight * ratio)),
  );
  const cropHeight = Math.max(1, Math.floor(cropWidth / ratio));
  const centerX = Math.round((normalizedCrop.x / 100) * width);
  const centerY = Math.round((normalizedCrop.y / 100) * height);
  let left = centerX - Math.round(cropWidth / 2);
  let top = centerY - Math.round(cropHeight / 2);

  left = Math.max(0, Math.min(left, width - cropWidth));
  top = Math.max(0, Math.min(top, height - cropHeight));

  return {
    height: cropHeight,
    left,
    top,
    width: cropWidth,
  };
};

const resolveExtension = ({
  filename,
  mimeType,
}: {
  filename?: null | string;
  mimeType?: null | string;
}): string => {
  const filenameExtension = filename?.split('.').pop()?.toLowerCase();

  if (filenameExtension) {
    return filenameExtension;
  }

  if (mimeType?.includes('/')) {
    return mimeType.split('/')[1] ?? 'jpg';
  }

  return 'jpg';
};

const sanitizeFilenameSegment = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

const buildDerivativeFilename = ({
  fingerprint,
  preset,
  sourceFilename,
  usagePath,
}: {
  fingerprint: string;
  preset: ImageTransformPresetDefinition;
  sourceFilename?: null | string;
  usagePath: string;
}): string => {
  const extension = resolveExtension({ filename: sourceFilename });
  const sourceStem = sanitizeFilenameSegment(
    sourceFilename?.replace(/\.[^.]+$/, '') || 'image-transform',
  );
  const usageStem = sanitizeFilenameSegment(usagePath || 'usage');
  const presetStem = sanitizeFilenameSegment(preset.key);

  return `${sourceStem}-${usageStem}-${presetStem}-${fingerprint.slice(0, 10)}.${extension}`;
};

const fetchSourceBuffer = async ({
  req,
  source,
}: {
  req: PayloadRequest;
  source: ImageTransformRelationValue;
}): Promise<Buffer> => {
  const sourceDoc = unwrapImageTransformRelation(source);

  if (!sourceDoc?.url) {
    throw new Error('The selected source asset does not expose a URL.');
  }

  const headers = new Headers();
  const cookie = req.headers.get('cookie');
  const authorization = req.headers.get('authorization');

  if (cookie) {
    headers.set('cookie', cookie);
  }

  if (authorization) {
    headers.set('authorization', authorization);
  }

  const response = await fetch(resolveAbsoluteURL(req, sourceDoc.url), {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch the source asset (${response.status.toString()} ${response.statusText}).`,
    );
  }

  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
};

export interface GenerateDerivativeArgs {
  readonly derivativeCollectionSlug: string;
  readonly fieldPath: string;
  readonly ownerID?: string;
  readonly ownerKind: ImageTransformOwnerKind;
  readonly ownerSlug: string;
  readonly preset: ImageTransformPresetDefinition;
  readonly presetValue?: ImageTransformPresetValue;
  readonly req: PayloadRequest;
  readonly source: ImageTransformRelationValue;
  readonly sourceRelationTo: string;
  readonly usagePath: string;
}

export interface GenerateDerivativeResult {
  readonly derivativeDoc: Record<string, unknown>;
  readonly fingerprint: string;
  readonly sourceVersion?: string;
}

const resolveSourceVersion = async ({
  req,
  source,
  sourceID,
  sourceRelationTo,
}: {
  req: PayloadRequest;
  source: ImageTransformRelationValue;
  sourceID: number | string;
  sourceRelationTo: string;
}): Promise<string | undefined> => {
  const relationVersion = getImageTransformSourceVersion(source);

  if (relationVersion) {
    return relationVersion;
  }

  const sourceDoc = (await req.payload.findByID({
    collection: sourceRelationTo,
    id: sourceID,
    overrideAccess: true,
    req,
    showHiddenFields: true,
  })) as { updatedAt?: unknown };

  return typeof sourceDoc.updatedAt === 'string'
    ? sourceDoc.updatedAt
    : undefined;
};

export const generateDerivative = async ({
  derivativeCollectionSlug,
  fieldPath,
  ownerID,
  ownerKind,
  ownerSlug,
  preset,
  presetValue,
  req,
  source,
  sourceRelationTo,
  usagePath,
}: GenerateDerivativeArgs): Promise<GenerateDerivativeResult> => {
  const sharp = req.payload.config.sharp;

  if (!sharp) {
    throw new Error(
      'Payload sharp configuration is required to generate derivatives.',
    );
  }

  const sourceID = getImageTransformRelationID(source);
  const sourceScalarID = getImageTransformRelationScalarID(source);
  const sourceDoc = unwrapImageTransformRelation(source);

  if (!sourceID || sourceScalarID === undefined || !sourceDoc) {
    throw new Error(
      'The selected source asset is not available for derivative generation.',
    );
  }

  const fingerprint = buildImageTransformFingerprint({
    crop: presetValue?.crop,
    preset,
    source,
  });
  const sourceVersion = await resolveSourceVersion({
    req,
    source,
    sourceID: sourceScalarID,
    sourceRelationTo,
  });
  const sourceBuffer = await fetchSourceBuffer({ req, source });
  const image = sharp(sourceBuffer).rotate();
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new Error(
      'Unable to determine the dimensions of the selected source asset.',
    );
  }

  const cropRegion = computeCropRegion({
    aspectRatio: preset.aspectRatio,
    crop: presetValue?.crop,
    height,
    width,
  });
  const { data } = await image
    .clone()
    .extract(cropRegion)
    .toBuffer({ resolveWithObject: true });
  const filename = buildDerivativeFilename({
    fingerprint,
    preset,
    sourceFilename: sourceDoc.filename,
    usagePath,
  });
  const derivativeDoc = (await req.payload.create({
    collection: derivativeCollectionSlug,
    data: {
      fieldPath,
      fingerprint,
      ownerID,
      ownerKind,
      ownerSlug,
      presetAspectRatio: preset.aspectRatio,
      presetKey: preset.key,
      source: sourceScalarID,
      sourceCollection: sourceRelationTo,
      sourceID,
      sourceVersion,
      usagePath,
    },
    file: {
      data,
      mimetype: sourceDoc.mimeType ?? 'image/jpeg',
      name: filename,
      size: data.length,
    },
    overrideAccess: true,
    req,
    showHiddenFields: true,
  })) as Record<string, unknown>;

  return {
    derivativeDoc,
    fingerprint,
    sourceVersion,
  };
};
