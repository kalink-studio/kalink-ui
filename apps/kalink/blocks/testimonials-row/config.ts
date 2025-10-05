import { anchorFields } from '../shared';

import type { Block } from 'payload';

export const testimonialsRow: Block = {
  slug: 'testimonialsRow',
  labels: {
    singular: 'Testimonials row',
    plural: 'Testimonials rows',
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
          name: 'testimonial',
          type: 'relationship',
          relationTo: 'testimonials',
          required: true,
        },
        {
          name: 'tintScheme',
          type: 'select',
          defaultValue: 'secondaryContainer',
          options: [
            { label: 'Secondary container', value: 'secondaryContainer' },
            { label: 'Primary container', value: 'primaryContainer' },
          ],
        },
      ],
    },
  ],
};
