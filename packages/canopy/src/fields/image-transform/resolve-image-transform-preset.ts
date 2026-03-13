import type {
  ImageTransformFieldValue,
  ImageTransformRelationValue,
  ImageTransformResolvedAsset,
} from './types.js';

const isObject = <T extends Record<string, unknown>>(
  value: unknown,
): value is T => typeof value === 'object' && value !== null;

const unwrapRelationValue = (
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

export const resolveImageTransformPreset = (
  value: ImageTransformFieldValue | null | undefined,
  presetKey: string,
): ImageTransformResolvedAsset | undefined => {
  if (!value) {
    return undefined;
  }

  const preset = value.presets?.[presetKey];

  if (preset?.state === 'ready') {
    const derivative = unwrapRelationValue(preset.derivative);

    if (derivative?.url) {
      return derivative;
    }
  }

  const source = unwrapRelationValue(value.source);

  if (source?.url) {
    return source;
  }

  return undefined;
};
