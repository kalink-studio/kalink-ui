import { createHash } from 'crypto';

import type {
  ImageTransformCrop,
  ImageTransformPresetDefinition,
  ImageTransformRelationValue,
  ImageTransformResolvedAsset,
} from '../../fields/image-transform';

const isObject = <T extends Record<string, unknown>>(
  value: unknown,
): value is T => typeof value === 'object' && value !== null;

export const normalizeImageTransformCrop = (
  crop: Partial<ImageTransformCrop> | null | undefined,
): ImageTransformCrop => {
  const toNumber = (value: unknown, fallback: number): number => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return fallback;
  };

  return {
    x: Math.max(0, Math.min(100, toNumber(crop?.x, 50))),
    y: Math.max(0, Math.min(100, toNumber(crop?.y, 50))),
    zoom: Math.max(1, toNumber(crop?.zoom, 1)),
  };
};

export const unwrapImageTransformRelation = (
  value: ImageTransformRelationValue | undefined,
): ImageTransformResolvedAsset | undefined => {
  if (!value) {
    return undefined;
  }

  if (
    isObject<{ value?: ImageTransformRelationValue }>(value) &&
    'value' in value
  ) {
    return unwrapImageTransformRelation(value.value);
  }

  if (!isObject<ImageTransformResolvedAsset>(value)) {
    return undefined;
  }

  return value;
};

export const getImageTransformRelationID = (
  value: ImageTransformRelationValue | undefined,
): string | undefined => {
  const relationID = getImageTransformRelationScalarID(value);

  if (relationID === undefined) {
    return undefined;
  }

  return String(relationID);
};

export const getImageTransformRelationScalarID = (
  value: ImageTransformRelationValue | undefined,
): number | string | undefined => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (
    isObject<{ value?: ImageTransformRelationValue }>(value) &&
    'value' in value
  ) {
    return getImageTransformRelationScalarID(value.value);
  }

  if (!isObject<{ id?: unknown; _id?: unknown }>(value)) {
    return undefined;
  }

  const rawID = value.id ?? value._id;

  if (typeof rawID === 'string' || typeof rawID === 'number') {
    return rawID;
  }

  return undefined;
};

export const getImageTransformRelationTo = (
  value: ImageTransformRelationValue | undefined,
): string | undefined => {
  if (
    isObject<{ relationTo?: unknown }>(value) &&
    typeof value.relationTo === 'string'
  ) {
    return value.relationTo;
  }

  return undefined;
};

export const getImageTransformSourceVersion = (
  value: ImageTransformRelationValue | undefined,
): string | undefined => {
  const relation = unwrapImageTransformRelation(value);

  return typeof relation?.updatedAt === 'string'
    ? relation.updatedAt
    : undefined;
};

export const buildImageTransformFingerprint = ({
  crop,
  preset,
  source,
}: {
  crop: Partial<ImageTransformCrop> | null | undefined;
  preset: ImageTransformPresetDefinition;
  source: ImageTransformRelationValue | undefined;
}): string => {
  const normalizedCrop = normalizeImageTransformCrop(crop);

  const payload = {
    crop: normalizedCrop,
    preset: {
      aspectRatio: preset.aspectRatio,
      key: preset.key,
      label: preset.label ?? null,
    },
    source: {
      id: getImageTransformRelationID(source),
      relationTo: getImageTransformRelationTo(source) ?? null,
    },
  };

  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
};
