import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical';

import { headingLevels } from './types.js';

import type {
  CreateHeadingFieldOptions,
  HeadingField,
  HeadingLevel,
} from './types.js';
import type { Field, RadioField, RichTextField, TextField } from 'payload';

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

export const createHeadingField = ({
  name = 'heading',
  label = 'Heading',
  requiredTitle = true,
  defaultLevel = 'h2',
  subtitlePlaceholder = 'Add subtitle',
}: CreateHeadingFieldOptions = {}): HeadingField => {
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
