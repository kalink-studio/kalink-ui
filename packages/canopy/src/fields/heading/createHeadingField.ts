import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical';

import type {
  Field,
  GroupField,
  RadioField,
  RichTextField,
  TextField,
} from 'payload';

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadingLevel = (typeof headingLevels)[number];

export interface CreateHeadingFieldOptions {
  readonly name?: string;
  readonly label?: string;
  readonly requiredTitle?: boolean;
  readonly defaultLevel?: HeadingLevel;
  readonly subtitlePlaceholder?: string;
}

export type HeadingField = GroupField;

const buildTitleField = (required: boolean): TextField => ({
  name: 'title',
  label: 'Title',
  type: 'text',
  required,
});

const buildPretitleField = (): TextField => ({
  name: 'pretitle',
  label: 'Pretitle',
  type: 'text',
});

const buildLevelField = (defaultValue: HeadingLevel): RadioField => ({
  name: 'level',
  label: 'Heading Level',
  type: 'radio',
  defaultValue,
  options: headingLevels.map((level) => ({
    label: level.toUpperCase(),
    value: level,
  })),
});

const buildSubtitleField = (placeholder: string): RichTextField => ({
  name: 'subtitle',
  label: 'Subtitle',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [ParagraphFeature()],
    admin: {
      hideAddBlockButton: true,
      hideDraggableBlockElement: true,
      hideGutter: true,
      hideInsertParagraphAtEnd: true,
      placeholder,
    },
  }),
});

export const createHeadingField = (
  options: CreateHeadingFieldOptions = {},
): HeadingField => {
  const {
    name = 'heading',
    label = 'Heading',
    requiredTitle = true,
    defaultLevel = 'h2',
    subtitlePlaceholder = 'Add subtitle',
  } = options;

  const fields: Field[] = [
    buildPretitleField(),
    buildTitleField(requiredTitle),
    buildLevelField(defaultLevel),
    buildSubtitleField(subtitlePlaceholder),
  ];

  return {
    name,
    label,
    type: 'group',
    fields,
  };
};
