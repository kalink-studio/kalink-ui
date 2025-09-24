import { anchorFields } from '../shared';

import type { Block } from 'payload';

export const mediaBanner: Block = {
  slug: 'mediaBanner',
  labels: {
    singular: 'Media banner',
    plural: 'Media banners',
  },
  fields: [
    ...anchorFields,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
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
    },
  ],
};
