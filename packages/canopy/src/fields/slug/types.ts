import type { CheckboxField, TextField } from 'payload';

export type SlugifyFn = (input: unknown) => string;

export interface SlugAdminCustom {
  readonly overrideDescription?: string;
  readonly overrideFieldPath: string;
  readonly overrideLabel: string;
  readonly sourceFieldPath: string;
}

export interface CreateSlugFieldsOptions {
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

export interface CreatedSlugFields {
  readonly overrideField: CheckboxField;
  readonly overrideFieldName: string;
  readonly slugField: TextField;
  readonly slugFieldName: string;
}
