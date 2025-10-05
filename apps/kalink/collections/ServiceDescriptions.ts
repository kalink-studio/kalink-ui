import type { CollectionConfig } from 'payload';

const backgroundOptions = [
  { label: 'Primary container', value: 'primaryContainer' },
  { label: 'Secondary container', value: 'secondaryContainer' },
] as const;

export const ServiceDescriptions: CollectionConfig = {
  slug: 'serviceDescriptions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'backgroundTint',
      type: 'select',
      options: [...backgroundOptions],
      defaultValue: 'primaryContainer',
    },
  ],
};
