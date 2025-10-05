import { anchorFields, backgroundTintField } from '../shared';

import type { Block } from 'payload';

export const fiftyFifty: Block = {
  slug: 'fiftyFifty',
  labels: {
    singular: '50/50 section',
    plural: '50/50 sections',
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
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'start',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'End', value: 'end' },
      ],
    },
  ],
};
