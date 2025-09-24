import { anchorFields, backgroundTintField } from '../shared';

import type { Block } from 'payload';

export const listItems: Block = {
  slug: 'listItems',
  labels: {
    singular: 'List section',
    plural: 'List sections',
  },
  fields: [
    ...anchorFields,
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      ...backgroundTintField,
      defaultValue: 'secondaryContainer',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
