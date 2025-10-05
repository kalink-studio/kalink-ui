import type { CollectionConfig } from 'payload';

const backgroundOptions = [
  { label: 'Secondary container', value: 'secondaryContainer' },
  { label: 'Primary container', value: 'primaryContainer' },
] as const;

export const Services: CollectionConfig = {
  slug: 'services',
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
      name: 'backgroundTint',
      type: 'select',
      options: [...backgroundOptions],
      defaultValue: 'secondaryContainer',
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
