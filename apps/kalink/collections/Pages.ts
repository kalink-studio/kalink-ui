import { blocks } from '../blocks';

import type { CollectionConfig } from 'payload';

const tintOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
] as const;

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: true,
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
      name: 'navigationLabel',
      type: 'text',
      label: 'Navigation label',
    },
    {
      name: 'tint',
      type: 'select',
      options: [...tintOptions],
      defaultValue: 'primary',
    },
    {
      name: 'isHomepage',
      type: 'checkbox',
      label: 'Homepage',
      admin: {
        description: 'Toggle for the single homepage entry.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta title',
        },
        {
          name: 'metaDescription',
          type: 'text',
          label: 'Meta description',
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Meta image',
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks,
    },
  ],
};
