import type { GroupField } from 'payload';

export const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadingLevel = (typeof headingLevels)[number];

export interface CreateHeadingFieldOptions {
  readonly name?: string;
  readonly label?: string;
  readonly requiredTitle?: boolean;
  readonly defaultLevel?: HeadingLevel;
  readonly subtitlePlaceholder?: string;
}

export type HeadingField = GroupField;
