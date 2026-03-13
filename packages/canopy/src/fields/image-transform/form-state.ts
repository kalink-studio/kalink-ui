import { DEFAULT_CROP } from './crop-math.js';

import type {
  ImageTransformAdminCustom,
  ImageTransformFieldValue,
  ImageTransformPresetDefinition,
  ImageTransformRelationValue,
  ImageTransformState,
} from './types.js';

export const isImageTransformAdminCustom = (
  value: unknown,
): value is ImageTransformAdminCustom => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return Array.isArray((value as ImageTransformAdminCustom).presets);
};

/** All nested form field suffixes for a single preset. */
export const PRESET_FIELD_SUFFIXES = [
  'crop.x',
  'crop.y',
  'crop.zoom',
  'derivative',
  'state',
  'fingerprint',
  'sourceVersion',
  'lastGeneratedAt',
  'lastError',
] as const;

export const getFormFieldValue = (
  formFields: Record<string, { value?: unknown } | undefined>,
  path: string,
): unknown => formFields[path]?.value;

/** Check whether any nested form field for the given preset has a non-nullish value. */
export const hasPresetFormData = (
  formFields: Record<string, { value?: unknown } | undefined>,
  presetBasePath: string,
): boolean =>
  PRESET_FIELD_SUFFIXES.some(
    (suffix) =>
      getFormFieldValue(formFields, `${presetBasePath}.${suffix}`) != null,
  );

export const buildFieldValueFromFormState = ({
  formFields,
  path,
  presets,
}: {
  formFields: Record<string, { value?: unknown } | undefined>;
  path: string;
  presets: readonly ImageTransformPresetDefinition[];
}): ImageTransformFieldValue => ({
  presets: Object.fromEntries(
    presets
      .filter((preset) =>
        hasPresetFormData(formFields, `${path}.presets.${preset.key}`),
      )
      .map((preset) => {
        const presetBasePath = `${path}.presets.${preset.key}`;
        const cropX = getFormFieldValue(formFields, `${presetBasePath}.crop.x`);
        const cropY = getFormFieldValue(formFields, `${presetBasePath}.crop.y`);
        const cropZoom = getFormFieldValue(
          formFields,
          `${presetBasePath}.crop.zoom`,
        );
        const hasCrop =
          typeof cropX === 'number' ||
          typeof cropY === 'number' ||
          typeof cropZoom === 'number';

        return [
          preset.key,
          {
            ...(hasCrop
              ? {
                  crop: {
                    x: typeof cropX === 'number' ? cropX : DEFAULT_CROP.x,
                    y: typeof cropY === 'number' ? cropY : DEFAULT_CROP.y,
                    zoom:
                      typeof cropZoom === 'number'
                        ? cropZoom
                        : DEFAULT_CROP.zoom,
                  },
                }
              : {}),
            derivative: getFormFieldValue(
              formFields,
              `${presetBasePath}.derivative`,
            ) as ImageTransformRelationValue | undefined,
            fingerprint: getFormFieldValue(
              formFields,
              `${presetBasePath}.fingerprint`,
            ) as string | undefined,
            lastError: getFormFieldValue(
              formFields,
              `${presetBasePath}.lastError`,
            ) as string | undefined,
            lastGeneratedAt: getFormFieldValue(
              formFields,
              `${presetBasePath}.lastGeneratedAt`,
            ) as string | undefined,
            sourceVersion: getFormFieldValue(
              formFields,
              `${presetBasePath}.sourceVersion`,
            ) as string | undefined,
            state: getFormFieldValue(formFields, `${presetBasePath}.state`) as
              | ImageTransformState
              | undefined,
          },
        ];
      }),
  ),
  source: getFormFieldValue(formFields, `${path}.source`) as
    | ImageTransformRelationValue
    | undefined,
});

/**
 * Dispatch REMOVE for every nested form field of a preset so the entries are
 * fully deleted from the Payload form reducer.  Using UPDATE with
 * `value: undefined` would only null-out the value while keeping the field
 * entry alive – which causes `hasPresetFormData` to see stale entries in some
 * edge cases and prevents the UI from returning to the "Missing" state.
 */
export const removePresetFormFields = (
  dispatchFields: (action: { path: string; type: 'REMOVE' }) => void,
  presetBasePath: string,
): void => {
  for (const suffix of PRESET_FIELD_SUFFIXES) {
    dispatchFields({
      path: `${presetBasePath}.${suffix}`,
      type: 'REMOVE',
    });
  }

  dispatchFields({
    path: `${presetBasePath}.crop`,
    type: 'REMOVE',
  });
  dispatchFields({
    path: presetBasePath,
    type: 'REMOVE',
  });
};
