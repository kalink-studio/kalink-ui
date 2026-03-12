import type {
  CreateSlugFieldsOptions,
  SlugifyFn,
} from '../../fields/slug/types';
import type { CollectionSlug } from 'payload';

export interface SlugPluginCollectionConfig extends CreateSlugFieldsOptions {
  readonly slug: CollectionSlug;
}

export type SlugPluginCollectionOption =
  | CollectionSlug
  | SlugPluginCollectionConfig;

export interface SlugPluginOptions {
  readonly collections: SlugPluginCollectionOption[];
  readonly slugify?: SlugifyFn;
}
