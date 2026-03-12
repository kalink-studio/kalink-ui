import { IMAGE_TRANSFORM_FIELD_CUSTOM_KEY } from '../../fields/image-transform/types';

import { getImageTransformRelationScalarID } from './fingerprint';

import type { ImageTransformOwnerKind } from './types';
import type {
  ImageTransformFieldCustom,
  ImageTransformFieldValue,
} from '../../fields/image-transform';
import type { Block, Field, Tab, PayloadRequest, Where } from 'payload';

const isObject = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' && value !== null;

const isNamedField = (field: Field | Tab): field is Field & { name: string } =>
  'name' in field && typeof field.name === 'string';

const tabHasName = (tab: Tab): tab is Tab & { name: string } =>
  'name' in tab && typeof tab.name === 'string';

const getImageTransformCustom = (
  field: Field,
): ImageTransformFieldCustom | undefined => {
  const rawCustom = isObject<{ custom?: unknown }>(field)
    ? (field.custom as { imageTransform?: unknown } | undefined)?.[
        IMAGE_TRANSFORM_FIELD_CUSTOM_KEY
      ]
    : undefined;

  if (!isObject<ImageTransformFieldCustom>(rawCustom)) {
    return undefined;
  }

  return rawCustom;
};

const normalizeFieldValue = (value: unknown): ImageTransformFieldValue =>
  isObject<ImageTransformFieldValue>(value) ? value : {};

const collectImageTransformValues = ({
  data,
  fields,
}: {
  data: unknown;
  fields: readonly Field[];
}): ImageTransformFieldValue[] => {
  const values: ImageTransformFieldValue[] = [];

  for (const field of fields) {
    if (field.type === 'row') {
      values.push(
        ...collectImageTransformValues({
          data,
          fields: field.fields,
        }),
      );

      continue;
    }

    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        if (tabHasName(tab)) {
          const tabData = isObject<Record<string, unknown>>(data)
            ? data[tab.name]
            : undefined;

          values.push(
            ...collectImageTransformValues({
              data: tabData,
              fields: tab.fields,
            }),
          );

          continue;
        }

        values.push(
          ...collectImageTransformValues({
            data,
            fields: tab.fields,
          }),
        );
      }

      continue;
    }

    if (!isNamedField(field)) {
      continue;
    }

    const fieldValue = isObject<Record<string, unknown>>(data)
      ? data[field.name]
      : undefined;

    if (getImageTransformCustom(field)) {
      values.push(normalizeFieldValue(fieldValue));
      continue;
    }

    if (field.type === 'group' || field.type === 'collapsible') {
      values.push(
        ...collectImageTransformValues({
          data: fieldValue,
          fields: field.fields,
        }),
      );

      continue;
    }

    if (field.type === 'array') {
      const rows = Array.isArray(fieldValue) ? fieldValue : [];

      rows.forEach((row) => {
        values.push(
          ...collectImageTransformValues({
            data: row,
            fields: field.fields,
          }),
        );
      });

      continue;
    }

    if (field.type === 'blocks') {
      const rows = Array.isArray(fieldValue) ? fieldValue : [];

      rows.forEach((row) => {
        if (
          !isObject<{ blockType?: unknown }>(row) ||
          typeof row.blockType !== 'string'
        ) {
          return;
        }

        const block = field.blocks.find(
          (candidate: Block) => candidate.slug === row.blockType,
        );

        if (!block) {
          return;
        }

        values.push(
          ...collectImageTransformValues({
            data: row,
            fields: block.fields,
          }),
        );
      });
    }
  }

  return values;
};

const collectDerivativeIDs = (
  values: readonly ImageTransformFieldValue[],
): Set<number | string> => {
  const ids = new Set<number | string>();

  for (const value of values) {
    for (const presetValue of Object.values(value.presets ?? {})) {
      const derivativeID = getImageTransformRelationScalarID(
        presetValue?.derivative,
      );

      if (derivativeID) {
        ids.add(derivativeID);
      }
    }
  }

  return ids;
};

export const deleteDerivativeByID = async ({
  allowMissing = false,
  derivativeCollectionSlug,
  id,
  req,
}: {
  allowMissing?: boolean;
  derivativeCollectionSlug: string;
  id: number | string;
  req: PayloadRequest;
}): Promise<void> => {
  try {
    await req.payload.delete({
      collection: derivativeCollectionSlug,
      id,
      overrideAccess: true,
      req,
    });
  } catch (error) {
    if (
      allowMissing &&
      error instanceof Error &&
      error.message.toLowerCase().includes('not found')
    ) {
      return;
    }

    throw error;
  }
};

export const cleanupReplacedDerivatives = async ({
  derivativeCollectionSlug,
  fields,
  nextDoc,
  previousDoc,
  req,
}: {
  derivativeCollectionSlug: string;
  fields: readonly Field[];
  nextDoc: Record<string, unknown>;
  previousDoc: Record<string, unknown>;
  req: PayloadRequest;
}): Promise<void> => {
  const previousIDs = collectDerivativeIDs(
    collectImageTransformValues({ data: previousDoc, fields }),
  );
  const nextIDs = collectDerivativeIDs(
    collectImageTransformValues({ data: nextDoc, fields }),
  );

  const removedIDs = [...previousIDs].filter((id) => !nextIDs.has(id));

  await Promise.allSettled(
    removedIDs.map((id) =>
      deleteDerivativeByID({
        allowMissing: true,
        derivativeCollectionSlug,
        id,
        req,
      }),
    ),
  );
};

const deleteByWhere = async ({
  derivativeCollectionSlug,
  req,
  where,
}: {
  derivativeCollectionSlug: string;
  req: PayloadRequest;
  where: Where;
}): Promise<void> => {
  await req.payload.delete({
    collection: derivativeCollectionSlug,
    overrideAccess: true,
    req,
    where,
  });
};

export const cleanupOwnerDerivatives = async ({
  derivativeCollectionSlug,
  ownerID,
  ownerKind,
  ownerSlug,
  req,
}: {
  derivativeCollectionSlug: string;
  ownerID?: string;
  ownerKind: ImageTransformOwnerKind;
  ownerSlug: string;
  req: PayloadRequest;
}): Promise<void> => {
  const where: Where = {
    ownerKind: {
      equals: ownerKind,
    },
    ownerSlug: {
      equals: ownerSlug,
    },
  };

  if (ownerID) {
    where.ownerID = {
      equals: ownerID,
    };
  }

  await deleteByWhere({
    derivativeCollectionSlug,
    req,
    where,
  });
};

export const cleanupSourceDerivatives = async ({
  derivativeCollectionSlug,
  req,
  sourceCollection,
  sourceID,
}: {
  derivativeCollectionSlug: string;
  req: PayloadRequest;
  sourceCollection: string;
  sourceID: string;
}): Promise<void> => {
  await deleteByWhere({
    derivativeCollectionSlug,
    req,
    where: {
      sourceCollection: {
        equals: sourceCollection,
      },
      sourceID: {
        equals: sourceID,
      },
    },
  });
};
