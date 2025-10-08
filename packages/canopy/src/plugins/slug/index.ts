import { createSlugFields } from './createSlugFields';
import { formatSlug } from './formatSlug';

import type { CreatedSlugFields } from './createSlugFields';
import type {
  SlugPluginCollectionConfig,
  SlugPluginCollectionOption,
  SlugPluginOptions,
} from './types';
import type { CollectionConfig, Config, Field } from 'payload';

export type {
  SlugAdminCustom,
  SlugPluginCollectionConfig,
  SlugPluginCollectionOption,
  SlugPluginOptions,
  SlugifyFn,
} from './types.js';
export { formatSlug } from './formatSlug';

const isNamedField = (
  field: Field | undefined,
): field is Field & { name: string } =>
  Boolean(field && 'name' in field && typeof field.name === 'string');

const normalizeCollectionOption = (
  option: SlugPluginCollectionOption,
): SlugPluginCollectionConfig =>
  typeof option === 'string' ? { slug: option } : option;

const insertSlugFields = (
  collection: CollectionConfig,
  slugFields: CreatedSlugFields,
  sourceFieldPath: string,
): CollectionConfig => {
  const { fields = [] } = collection;

  const sanitizedFields = fields.filter(
    (field) =>
      !(
        isNamedField(field) &&
        [slugFields.slugFieldName, slugFields.overrideFieldName].includes(
          field.name,
        )
      ),
  );

  const topLevelSourceField = sourceFieldPath.split('.')[0];

  const insertionIndex = sanitizedFields.findIndex(
    (field) => isNamedField(field) && field.name === topLevelSourceField,
  );

  if (insertionIndex === -1) {
    return {
      ...collection,
      fields: [
        ...sanitizedFields,
        slugFields.slugField,
        slugFields.overrideField,
      ],
    };
  }

  const nextFields = [...sanitizedFields];

  nextFields.splice(
    insertionIndex + 1,
    0,
    slugFields.slugField,
    slugFields.overrideField,
  );

  return {
    ...collection,
    fields: nextFields,
  };
};

export const slugPlugin =
  (pluginOptions: SlugPluginOptions) =>
  (config: Config): Config => {
    const { collections: collectionOptions = [], slugify = formatSlug } =
      pluginOptions ?? {};

    if (!config.collections || config.collections.length === 0) {
      return config;
    }

    const normalizedOptions = collectionOptions.map(normalizeCollectionOption);
    const optionsBySlug = new Map(
      normalizedOptions.map((option) => [option.slug, option]),
    );

    const nextCollections = config.collections.map((collection) => {
      const option = optionsBySlug.get(collection.slug);

      if (!option) {
        return collection;
      }

      const {
        overrideDescription,
        overrideField,
        overrideFieldName,
        overrideLabel,
        slugField,
        slugify: collectionSlugify,
        sourceFieldPath = 'title',
        ...rest
      } = option;

      const builtFields = createSlugFields({
        ...rest,
        description: option.description,
        label: option.label,
        name: option.name,
        overrideDescription,
        overrideField,
        overrideFieldName,
        overrideLabel,
        slugField,
        slugify: collectionSlugify ?? slugify,
        sourceFieldPath,
      });

      return insertSlugFields(collection, builtFields, sourceFieldPath);
    });

    return {
      ...config,
      collections: nextCollections,
    };
  };
