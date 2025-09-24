import type { CollectionConfig } from 'payload';

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'givenName',
    defaultColumns: ['givenName', 'surname', 'jobTitle', 'updatedAt'],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'givenName',
      type: 'text',
      required: true,
    },
    {
      name: 'surname',
      type: 'text',
      required: true,
    },
    {
      name: 'jobTitle',
      type: 'text',
    },
    {
      name: 'summary',
      type: 'richText',
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
