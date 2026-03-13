import {
  buildImageTransformFingerprint,
  getImageTransformSourceVersion,
  normalizeImageTransformCrop,
} from '../../plugins/image-transform/fingerprint.js';

import {
  IMAGE_TRANSFORM_FIELD_CUSTOM_KEY,
  IMAGE_TRANSFORM_PENDING_DERIVATIVE_RELATION,
  IMAGE_TRANSFORM_PENDING_SOURCE_RELATION,
} from './types.js';

import type {
  CreateImageTransformFieldOptions,
  ImageTransformFieldCustom,
  ImageTransformFieldValue,
  ImageTransformPresetDefinition,
  ImageTransformPresetValue,
  ImageTransformRelationValue,
  ImageTransformState,
} from './types.js';
import type {
  DateField,
  FieldHook,
  GroupField,
  NumberField,
  RelationshipField,
  SelectField,
  TextField,
  TextareaField,
  UploadField,
  Validate,
} from 'payload';

const CLIENT_COMPONENT_PATH = '@kalink-ui/canopy/client#ImageTransformField';

const imageTransformStates = [
  'unsaved',
  'missing',
  'ready',
  'stale',
  'generating',
  'failed',
] as const;

interface DbNamedField {
  readonly dbName?: string;
  readonly enumName?: string;
}

type ImageTransformField = GroupField & DbNamedField;
type DbNamedDateField = DateField & DbNamedField;
type DbNamedGroupField = GroupField & DbNamedField;
type DbNamedNumberField = NumberField & DbNamedField;
type DbNamedRelationshipField = RelationshipField & DbNamedField;
type DbNamedSelectField = SelectField & DbNamedField;
type DbNamedTextField = TextField & DbNamedField;
type DbNamedTextareaField = TextareaField & DbNamedField;
type DbNamedUploadField = UploadField & DbNamedField;

const sanitizeIdentifierSegment = (input: string): string => {
  const sanitized = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  return sanitized || 'x';
};

const createStableSuffix = (input: string, length = 5): string => {
  let hash = 2166136261;

  for (const character of input) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36).slice(0, length).padStart(length, '0');
};

const compactDbIdentifier = (
  input: string,
  options: {
    readonly bodyLength?: number;
    readonly maxLength?: number;
    readonly prefix: string;
    readonly suffixLength?: number;
  },
): string => {
  const { bodyLength = 8, maxLength = 24, prefix, suffixLength = 5 } = options;
  const sanitizedPrefix = sanitizeIdentifierSegment(prefix);
  const suffix = createStableSuffix(input, suffixLength);
  const availableBodyLength = Math.max(
    1,
    Math.min(
      bodyLength,
      maxLength - sanitizedPrefix.length - suffix.length - 2,
    ),
  );
  const body = sanitizeIdentifierSegment(input)
    .replace(/_/g, '')
    .slice(0, availableBodyLength);

  return `${sanitizedPrefix}_${body || 'x'}_${suffix}`.slice(0, maxLength);
};

const createRootDbName = (name: string): string =>
  compactDbIdentifier(name, {
    bodyLength: 8,
    maxLength: 18,
    prefix: 'it',
    suffixLength: 5,
  });

const createPresetDbName = (key: string): string =>
  compactDbIdentifier(key, {
    bodyLength: 8,
    maxLength: 18,
    prefix: 'p',
    suffixLength: 5,
  });

const createStateEnumName = (scope: string): string =>
  compactDbIdentifier(scope, {
    bodyLength: 10,
    maxLength: 24,
    prefix: 'itst',
    suffixLength: 5,
  });

const isObject = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' && value !== null;

const getRelationIdentity = (
  value: ImageTransformRelationValue | undefined,
): string | undefined => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (
    isObject<{ value?: ImageTransformRelationValue }>(value) &&
    'value' in value
  ) {
    return getRelationIdentity(value.value);
  }

  if (!isObject<{ id?: unknown; _id?: unknown }>(value)) {
    return undefined;
  }

  const rawID = value.id ?? value._id;

  if (typeof rawID === 'string' || typeof rawID === 'number') {
    return String(rawID);
  }

  return undefined;
};

const hasSourceValue = (
  value: ImageTransformRelationValue | undefined,
): boolean => {
  if (getRelationIdentity(value)) {
    return true;
  }

  if (
    isObject<{ value?: ImageTransformRelationValue }>(value) &&
    'value' in value
  ) {
    return hasSourceValue(value.value);
  }

  return isObject(value);
};

const unwrapRelationObject = (
  value: ImageTransformRelationValue | undefined,
): Record<string, unknown> | undefined => {
  if (!isObject<Record<string, unknown>>(value)) {
    return undefined;
  }

  if ('value' in value) {
    return unwrapRelationObject(value.value as ImageTransformRelationValue);
  }

  return value;
};

const getRelationMetadataString = (
  value: ImageTransformRelationValue | undefined,
  key: string,
): string | undefined => {
  const relation = unwrapRelationObject(value);
  const rawValue = relation?.[key];

  return typeof rawValue === 'string' ? rawValue : undefined;
};

const createNumberField = (
  name: 'x' | 'y' | 'zoom',
  dbName: 'x' | 'y' | 'zm',
  defaultValue: number,
): DbNamedNumberField => ({
  name,
  type: 'number',
  dbName,
  admin: {
    hidden: true,
  },
  defaultValue,
});

const createStateField = (enumName: string): DbNamedSelectField => ({
  name: 'state',
  type: 'select',
  dbName: 'st',
  enumName,
  admin: {
    hidden: true,
  },
  options: imageTransformStates.map((state) => ({
    label: state,
    value: state,
  })),
});

const createFingerprintField = (): DbNamedTextField => ({
  name: 'fingerprint',
  type: 'text',
  dbName: 'fp',
  admin: {
    hidden: true,
  },
});

const createLastGeneratedAtField = (): DbNamedDateField => ({
  name: 'lastGeneratedAt',
  type: 'date',
  dbName: 'lga',
  admin: {
    hidden: true,
  },
});

const createSourceVersionField = (): DbNamedTextField => ({
  name: 'sourceVersion',
  type: 'text',
  dbName: 'sv',
  admin: {
    hidden: true,
  },
});

const createLastErrorField = (): DbNamedTextareaField => ({
  name: 'lastError',
  type: 'textarea',
  dbName: 'le',
  admin: {
    hidden: true,
  },
});

const createPresetFields = (
  preset: ImageTransformPresetDefinition,
  rootDbName: string,
): DbNamedGroupField => ({
  name: preset.key,
  label: preset.label ?? preset.key,
  type: 'group',
  dbName: createPresetDbName(preset.key),
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'crop',
      type: 'group',
      dbName: 'cr',
      admin: {
        hidden: true,
      },
      fields: [
        createNumberField('x', 'x', 50),
        createNumberField('y', 'y', 50),
        createNumberField('zoom', 'zm', 1),
      ],
    } as DbNamedGroupField,
    {
      name: 'derivative',
      type: 'relationship',
      dbName: 'drv',
      relationTo: IMAGE_TRANSFORM_PENDING_DERIVATIVE_RELATION,
      admin: {
        hidden: true,
      },
    } as DbNamedRelationshipField,
    createStateField(
      createStateEnumName(`${rootDbName}_${createPresetDbName(preset.key)}`),
    ),
    createFingerprintField(),
    createSourceVersionField(),
    createLastGeneratedAtField(),
    createLastErrorField(),
  ],
});

const hasPersistableCropInput = (
  crop: ImageTransformPresetValue['crop'] | undefined,
): boolean =>
  Boolean(
    crop &&
    (['x', 'y', 'zoom'] as const).some((key) => {
      const value = crop[key];

      return typeof value === 'number' && Number.isFinite(value);
    }),
  );

const hasPersistablePresetInput = (
  preset: ImageTransformPresetValue | null | undefined,
): boolean =>
  Boolean(
    preset &&
    (hasPersistableCropInput(preset.crop) ||
      getRelationIdentity(preset.derivative) ||
      (preset.state && preset.state !== 'missing') ||
      preset.fingerprint ||
      preset.sourceVersion ||
      preset.lastGeneratedAt ||
      preset.lastError),
  );

const normalizeImageTransformFieldValue = (
  value: unknown,
): ImageTransformFieldValue =>
  isObject<ImageTransformFieldValue>(value) ? value : {};

const createBeforeChangeHook = (
  presets: readonly ImageTransformPresetDefinition[],
): FieldHook<
  { id: number | string } & Record<string, unknown>,
  ImageTransformFieldValue | undefined,
  Record<string, unknown>
> => {
  const hook: FieldHook<
    { id: number | string } & Record<string, unknown>,
    ImageTransformFieldValue | undefined,
    Record<string, unknown>
  > = ({ previousValue, value }) => {
    const rawValue = normalizeImageTransformFieldValue(value);
    const previousFieldValue = normalizeImageTransformFieldValue(previousValue);
    const source = rawValue.source;

    if (!hasSourceValue(source)) {
      return {};
    }

    const nextPresets = presets.reduce<
      Record<string, ImageTransformPresetValue>
    >((accumulator, preset) => {
      const rawPreset = rawValue.presets?.[preset.key];
      const previousPreset = previousFieldValue.presets?.[preset.key];

      if (!hasPersistablePresetInput(rawPreset)) {
        return accumulator;
      }

      const crop = normalizeImageTransformCrop(rawPreset?.crop);
      const fingerprint = buildImageTransformFingerprint({
        crop,
        preset,
        source,
      });
      const sourceVersion = getImageTransformSourceVersion(source);
      const derivative = rawPreset?.derivative;
      const derivativeID = getRelationIdentity(derivative);
      const explicitState = rawPreset?.state;
      const derivativeFingerprint = getRelationMetadataString(
        derivative,
        'fingerprint',
      );
      const derivativeSourceVersion = getRelationMetadataString(
        derivative,
        'sourceVersion',
      );
      const expectedFingerprint =
        derivativeFingerprint ??
        rawPreset?.fingerprint ??
        previousPreset?.fingerprint;
      const sameFingerprint =
        Boolean(expectedFingerprint) && expectedFingerprint === fingerprint;
      const expectedSourceVersion =
        derivativeSourceVersion ??
        rawPreset?.sourceVersion ??
        previousPreset?.sourceVersion;
      const sameSourceVersion =
        !expectedSourceVersion || !sourceVersion
          ? true
          : expectedSourceVersion === sourceVersion;
      const previousState = previousPreset?.state;
      let state: ImageTransformState;

      if (derivativeID) {
        if (!sameFingerprint || !sameSourceVersion) {
          state = 'stale';
        } else if (explicitState === 'failed') {
          state = 'failed';
        } else if (explicitState === 'generating') {
          state = 'generating';
        } else {
          state = 'ready';
        }
      } else if (explicitState === 'failed' && sameFingerprint) {
        state = 'failed';
      } else if (explicitState === 'generating' && sameFingerprint) {
        state = 'generating';
      } else if (previousState === 'failed' && sameFingerprint) {
        state = 'failed';
      } else {
        state = 'missing';
      }

      accumulator[preset.key] = {
        crop,
        derivative: derivativeID ? derivative : undefined,
        fingerprint,
        lastError:
          state === 'failed' || state === 'generating'
            ? (rawPreset?.lastError ?? previousPreset?.lastError)
            : undefined,
        lastGeneratedAt:
          state === 'ready' || state === 'stale' || state === 'failed'
            ? (rawPreset?.lastGeneratedAt ?? previousPreset?.lastGeneratedAt)
            : undefined,
        sourceVersion:
          derivativeSourceVersion ??
          sourceVersion ??
          rawPreset?.sourceVersion ??
          previousPreset?.sourceVersion,
        state,
      };

      return accumulator;
    }, {});

    return {
      presets: Object.keys(nextPresets).length > 0 ? nextPresets : undefined,
      source,
    } satisfies ImageTransformFieldValue;
  };

  return hook;
};

const createValidate = (
  required: boolean,
): Validate<unknown, unknown, unknown, GroupField> => {
  const validate: Validate<unknown, unknown, unknown, GroupField> = (value) => {
    if (!required) {
      return true;
    }

    const fieldValue = normalizeImageTransformFieldValue(value);

    return hasSourceValue(fieldValue.source)
      ? true
      : 'A source image is required.';
  };

  return validate;
};

const validatePresets = (
  presets: readonly ImageTransformPresetDefinition[],
): readonly ImageTransformPresetDefinition[] => {
  const keys = new Set<string>();

  for (const preset of presets) {
    if (!preset.key || preset.key.includes('.')) {
      throw new Error(
        `Image transform preset keys must be non-empty and cannot contain dots. Received "${preset.key}".`,
      );
    }

    if (keys.has(preset.key)) {
      throw new Error(
        `Image transform preset keys must be unique. Duplicate key "${preset.key}" found.`,
      );
    }

    keys.add(preset.key);
  }

  return presets;
};

export const createImageTransformField = (
  options: CreateImageTransformFieldOptions,
): ImageTransformField => {
  const {
    dbName,
    label = 'Image',
    name = 'image',
    presets: inputPresets,
    relationTo,
    required = false,
  } = options;

  const presets = validatePresets(inputPresets);
  const rootDbName = dbName ?? createRootDbName(name);

  const customConfig: ImageTransformFieldCustom = {
    presets,
    relationTo,
    required,
  };

  return {
    name,
    dbName: rootDbName,
    label,
    type: 'group',
    hooks: {
      beforeChange: [createBeforeChangeHook(presets)],
    },
    validate: createValidate(required),
    admin: {
      components: {
        Field: {
          path: CLIENT_COMPONENT_PATH,
        },
      },
      custom: {
        [IMAGE_TRANSFORM_FIELD_CUSTOM_KEY]: customConfig,
      },
    },
    custom: {
      [IMAGE_TRANSFORM_FIELD_CUSTOM_KEY]: customConfig,
    },
    fields: [
      {
        name: 'source',
        dbName: 'src',
        label: 'Source image',
        type: 'upload',
        relationTo: relationTo ?? IMAGE_TRANSFORM_PENDING_SOURCE_RELATION,
        required,
        filterOptions: {
          mimeType: {
            contains: 'image',
          },
        },
        admin: {
          hidden: true,
        },
      } as DbNamedUploadField,
      {
        name: 'presets',
        type: 'group',
        dbName: 'pr',
        admin: {
          hidden: true,
        },
        fields: presets.map((preset) => createPresetFields(preset, rootDbName)),
      } as DbNamedGroupField,
    ],
  };
};

export type { ImageTransformField };
