import { anchorFields } from '../shared';

import type { Block } from 'payload';

export const team: Block = {
  slug: 'team',
  labels: {
    singular: 'Team section',
    plural: 'Team sections',
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
        ...anchorFields,
        {
          name: 'person',
          type: 'relationship',
          relationTo: 'people',
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
        {
          name: 'backgroundTint',
          type: 'select',
          defaultValue: 'primaryContainer',
          options: [
            { label: 'Primary container', value: 'primaryContainer' },
            { label: 'Secondary container', value: 'secondaryContainer' },
          ],
        },
      ],
    },
  ],
};
