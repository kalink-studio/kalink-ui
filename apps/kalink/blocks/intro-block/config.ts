import { anchorFields, backgroundTintField } from '../shared';

import type { Block } from 'payload';

export const introBlock: Block = {
  slug: 'introBlock',
  labels: {
    singular: 'Intro block',
    plural: 'Intro blocks',
  },
  fields: [
    ...anchorFields,
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      ...backgroundTintField,
      defaultValue: 'primary',
    },
    {
      name: 'ctas',
      type: 'array',
      label: 'CTA buttons',
      admin: {
        description:
          'Optional set of links to media assets (PDFs, videos, etc.)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Filled', value: 'filled' },
            { label: 'Outlined', value: 'outlined' },
            { label: 'Bare', value: 'bare' },
            { label: 'Ghost', value: 'ghost' },
          ],
          defaultValue: 'filled',
        },
      ],
    },
  ],
};
