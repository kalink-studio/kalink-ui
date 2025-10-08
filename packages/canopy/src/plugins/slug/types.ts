import type { CheckboxField, CollectionSlug, TextField } from 'payload';

export type SlugifyFn = (input: unknown) => string;

export interface SlugAdminCustom {
  readonly overrideDescription?: string;
  readonly overrideFieldPath: string;
  readonly overrideLabel: string;
  readonly sourceFieldPath: string;
}

export interface SlugPluginCollectionConfig {
  readonly slug: CollectionSlug;
  readonly name?: string;
  readonly label?: string;
  readonly description?: string;
  readonly sourceFieldPath?: string;
  readonly overrideFieldName?: string;
  readonly overrideLabel?: string;
  readonly overrideDescription?: string;
  readonly slugify?: SlugifyFn;
  readonly slugField?: Partial<TextField>;
  readonly overrideField?: Partial<CheckboxField>;
}

export type SlugPluginCollectionOption =
  | CollectionSlug
  | SlugPluginCollectionConfig;

export interface SlugPluginOptions {
  readonly collections: SlugPluginCollectionOption[];
  readonly slugify?: SlugifyFn;
}
