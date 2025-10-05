import { anchorFields } from '../shared';

import type { Block } from 'payload';

export const servicesGrid: Block = {
  slug: 'servicesGrid',
  labels: {
    singular: 'Services grid',
    plural: 'Services grids',
  },
  fields: [
    ...anchorFields,
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'entry',
          type: 'relationship',
          relationTo: ['services', 'serviceDescriptions'],
          required: true,
        },
      ],
    },
  ],
};
