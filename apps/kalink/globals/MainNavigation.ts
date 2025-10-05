import type { GlobalConfig } from 'payload';

export const MainNavigation: GlobalConfig = {
  slug: 'mainNavigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 0,
      label: 'Navigation items',
      admin: {
        description:
          'Ordered list of pages to expose in the primary navigation.',
      },
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
        {
          name: 'labelOverride',
          type: 'text',
          label: 'Label override',
        },
      ],
    },
  ],
};
