import { formatSlug } from './formatSlug';
import { getValueByPath } from './getValueByPath';

import type {
  SlugAdminCustom,
  SlugPluginCollectionConfig,
  SlugifyFn,
} from './types';
import type {
  CheckboxField,
  FieldHook,
  FieldHookArgs,
  TextField,
} from 'payload';

const CLIENT_COMPONENT_PATH = '@kalink-ui/canopy/plugins/slug/client#SlugField';

interface BeforeValidateHookArgs {
  readonly overrideFieldPath: string;
  readonly slugFieldPath: string;
  readonly sourceFieldPath: string;
  readonly slugify: SlugifyFn;
}

interface CreateSlugFieldsArgs
  extends Omit<SlugPluginCollectionConfig, 'slug'> {
  readonly slugify: SlugifyFn;
}

export interface CreatedSlugFields {
  readonly overrideField: CheckboxField;
  readonly overrideFieldName: string;
  readonly slugField: TextField;
  readonly slugFieldName: string;
}

const isSlugAdminCustom = (
  value: unknown,
): value is Partial<SlugAdminCustom> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<SlugAdminCustom>;

  return (
    (candidate.overrideDescription === undefined ||
      typeof candidate.overrideDescription === 'string') &&
    typeof candidate.overrideFieldPath !== 'undefined' &&
    typeof candidate.overrideLabel !== 'undefined' &&
    typeof candidate.sourceFieldPath !== 'undefined'
  );
};

const createBeforeValidateHook = ({
  overrideFieldPath,
  slugFieldPath,
  sourceFieldPath,
  slugify,
}: BeforeValidateHookArgs): FieldHook<any, string | undefined, any> => {
  const hook = ({
    value,
    data,
    siblingData,
    originalDoc,
  }: FieldHookArgs<any, string | undefined, any>) => {
    const sources = [data, siblingData, originalDoc];

    const manualOverride = sources.some((source) => {
      const overrideValue = getValueByPath(source, overrideFieldPath);

      if (typeof overrideValue === 'boolean') {
        return overrideValue;
      }

      if (typeof overrideValue === 'string') {
        const normalized = overrideValue.toLowerCase();

        if (normalized === 'true') {
          return true;
        }

        if (normalized === 'false') {
          return false;
        }
      }

      return false;
    });

    if (manualOverride) {
      const manualCandidate = [value, getValueByPath(data, slugFieldPath)].find(
        (candidate): candidate is string =>
          typeof candidate === 'string' && candidate.length > 0,
      );

      if (manualCandidate === undefined) {
        return value ?? '';
      }

      return slugify(manualCandidate);
    }

    const titleCandidate = [data, siblingData, originalDoc]
      .map((source) => getValueByPath(source, sourceFieldPath))
      .find(
        (candidate): candidate is string =>
          typeof candidate === 'string' && candidate.trim().length > 0,
      );

    if (titleCandidate !== undefined) {
      return slugify(titleCandidate);
    }

    const fallbackCandidate = [
      value,
      getValueByPath(originalDoc, slugFieldPath),
    ].find(
      (candidate): candidate is string =>
        typeof candidate === 'string' && candidate.trim().length > 0,
    );

    if (fallbackCandidate !== undefined) {
      return slugify(fallbackCandidate);
    }

    return value ?? '';
  };

  return hook;
};

export const createSlugFields = ({
  name = 'slug',
  label = 'Slug',
  description,
  sourceFieldPath = 'title',
  overrideFieldName = `${name}ManualOverride`,
  overrideLabel = 'Edit slug manually',
  overrideDescription,
  slugify = formatSlug,
  slugField: slugFieldOverrides,
  overrideField: overrideFieldOverrides,
}: CreateSlugFieldsArgs): CreatedSlugFields => {
  const beforeValidateHook = createBeforeValidateHook({
    overrideFieldPath: overrideFieldName,
    slugFieldPath: name,
    sourceFieldPath,
    slugify,
  });

  const existingAdmin = slugFieldOverrides?.admin ?? {};

  const existingCustom = isSlugAdminCustom(
    (existingAdmin.custom as { slug?: unknown } | undefined)?.slug,
  )
    ? ((existingAdmin.custom as { slug?: unknown })?.slug as SlugAdminCustom)
    : undefined;

  const slugField: TextField = {
    name,
    label,
    type: 'text',
    hasMany: false,
    required: true,
    unique: true,
    index: true,
    hooks: {
      beforeValidate: [beforeValidateHook],
    },
    admin: {
      description,
      components: {
        Field: {
          path: CLIENT_COMPONENT_PATH,
        },
      },
      custom: {
        slug: {
          overrideDescription,
          overrideFieldPath: overrideFieldName,
          overrideLabel,
          sourceFieldPath,
        },
      },
    },
  };

  if (slugFieldOverrides) {
    Object.assign(slugField, slugFieldOverrides);
  }

  slugField.name = name;
  slugField.label = label;
  slugField.type = 'text';
  slugField.hasMany = false;
  slugField.required =
    slugFieldOverrides?.required === undefined
      ? true
      : slugFieldOverrides.required;
  slugField.unique =
    slugFieldOverrides?.unique === undefined ? true : slugFieldOverrides.unique;
  slugField.index =
    slugFieldOverrides?.index === undefined ? true : slugFieldOverrides.index;

  const hookOverrides = slugFieldOverrides?.hooks;
  const baseHooks = hookOverrides ? { ...hookOverrides } : {};

  slugField.hooks = {
    ...baseHooks,
    beforeValidate: [
      beforeValidateHook,
      ...(hookOverrides?.beforeValidate ?? []),
    ],
  };

  slugField.admin = {
    ...existingAdmin,
    description:
      existingAdmin.description === undefined
        ? description
        : existingAdmin.description,
    components: {
      ...existingAdmin.components,
      Field: {
        ...(typeof existingAdmin.components?.Field === 'object'
          ? existingAdmin.components.Field
          : {}),
        path: CLIENT_COMPONENT_PATH,
      },
    },
    custom: {
      ...existingAdmin.custom,
      slug: {
        ...existingCustom,
        overrideDescription,
        overrideFieldPath: overrideFieldName,
        overrideLabel,
        sourceFieldPath,
      },
    },
  };

  const overrideField: CheckboxField = {
    ...overrideFieldOverrides,
    name: overrideFieldName,
    label: overrideLabel,
    type: 'checkbox',
    defaultValue:
      overrideFieldOverrides?.defaultValue === undefined
        ? false
        : overrideFieldOverrides.defaultValue,
    admin: {
      ...overrideFieldOverrides?.admin,
      hidden: true,
      disableListColumn: true,
    },
  };

  return {
    overrideField,
    overrideFieldName,
    slugField,
    slugFieldName: name,
  };
};
