import type {
  ImageTransformRelationValue,
  ImageTransformResolvedAsset,
} from './types';

export const isObject = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' && value !== null;

export const unwrapRelationValue = (
  value: ImageTransformRelationValue | undefined,
): ImageTransformResolvedAsset | undefined => {
  if (!value) {
    return undefined;
  }

  if (
    isObject<{ value?: ImageTransformRelationValue }>(value) &&
    'value' in value
  ) {
    return unwrapRelationValue(value.value);
  }

  if (!isObject<ImageTransformResolvedAsset>(value)) {
    return undefined;
  }

  return value;
};

export const getRelationID = (
  value: ImageTransformRelationValue | undefined,
): string | undefined => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (
    isObject<{ value?: ImageTransformRelationValue }>(value) &&
    'value' in value
  ) {
    return getRelationID(value.value);
  }

  if (!isObject<{ _id?: unknown; id?: unknown }>(value)) {
    return undefined;
  }

  const rawID = value.id ?? value._id;

  if (typeof rawID === 'string' || typeof rawID === 'number') {
    return String(rawID);
  }

  return undefined;
};
