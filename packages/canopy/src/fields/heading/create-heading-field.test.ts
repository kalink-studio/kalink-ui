import { describe, expect, it } from 'vitest';

import { createHeadingField } from './create-heading-field.js';

describe('createHeadingField', () => {
  it('builds the default heading field shape', () => {
    const field = createHeadingField();

    expect(field).toMatchObject({
      fields: [
        {
          label: 'Pretitle',
          name: 'pretitle',
          type: 'text',
        },
        {
          label: 'Title',
          name: 'title',
          required: true,
          type: 'text',
        },
        {
          defaultValue: 'h2',
          label: 'Heading Level',
          name: 'level',
          type: 'radio',
        },
        {
          label: 'Subtitle',
          name: 'subtitle',
          type: 'richText',
        },
      ],
      label: 'Heading',
      name: 'heading',
      type: 'group',
    });
  });

  it('applies custom option overrides', () => {
    const field = createHeadingField({
      defaultLevel: 'h4',
      label: 'Section Heading',
      name: 'sectionHeading',
      requiredTitle: false,
      subtitlePlaceholder: 'Write supporting copy',
    });

    const titleField = field.fields[1];
    const levelField = field.fields[2];
    const subtitleField = field.fields[3];

    expect(field).toMatchObject({
      label: 'Section Heading',
      name: 'sectionHeading',
    });
    expect(titleField).toMatchObject({
      name: 'title',
      required: false,
    });
    expect(levelField).toMatchObject({
      defaultValue: 'h4',
      name: 'level',
    });
    expect(subtitleField).toMatchObject({
      name: 'subtitle',
      type: 'richText',
    });
  });
});
