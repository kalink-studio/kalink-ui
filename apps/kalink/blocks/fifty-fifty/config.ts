import { createImageTransformField } from '@kalink-ui/canopy';

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
    createImageTransformField({
      name: 'image',
      presets: [
        {
          aspectRatio: '16:9',
          key: 'landscape',
          label: 'Landscape',
        },
        {
          aspectRatio: '4:5',
          key: 'portrait',
          label: 'Portrait',
        },
      ],
      relationTo: 'media',
      required: true,
    }),
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
