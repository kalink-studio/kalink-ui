import { createSlugFields, formatSlug } from '../../fields/slug/index.js';

import type {
  SlugPluginCollectionConfig,
  SlugPluginCollectionOption,
  SlugPluginOptions,
} from './types.js';
import type { CreatedSlugFields } from '../../fields/slug/index.js';
import type { CollectionConfig, CollectionSlug, Config, Field } from 'payload';

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
    const optionsBySlug = new Map<CollectionSlug, SlugPluginCollectionConfig>(
      normalizedOptions.map((option) => [option.slug, option]),
    );

    const nextCollections = config.collections.map((collection) => {
      const option = optionsBySlug.get(collection.slug as CollectionSlug);

      if (!option) {
        return collection;
      }

      const { slug, slugify: collectionSlugify, ...fieldOptions } = option;
      const sourceFieldPath = fieldOptions.sourceFieldPath ?? 'title';
      const builtFields = createSlugFields({
        ...fieldOptions,
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
