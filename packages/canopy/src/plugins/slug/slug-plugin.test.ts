import { describe, expect, it } from 'vitest';

import { slugPlugin } from './slug-plugin.js';

describe('slugPlugin', () => {
  it('inserts slug fields after the top-level source field and replaces duplicates', () => {
    const config = slugPlugin({
      collections: [
        {
          slug: 'pages',
          sourceFieldPath: 'seo.title',
        },
      ],
    })({
      collections: [
        {
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
              ],
              name: 'seo',
              type: 'group',
            },
            {
              name: 'slug',
              type: 'text',
            },
            {
              name: 'slugManualOverride',
              type: 'checkbox',
            },
          ],
          slug: 'pages',
        },
      ],
    } as never);

    const fields = config.collections?.[0]?.fields ?? [];
    const fieldNames = fields.flatMap((field) =>
      'name' in field && typeof field.name === 'string' ? [field.name] : [],
    );

    expect(fieldNames).toEqual(['title', 'seo', 'slug', 'slugManualOverride']);
    expect(fields[2]).toMatchObject({
      admin: {
        custom: {
          slug: {
            sourceFieldPath: 'seo.title',
          },
        },
      },
      name: 'slug',
      type: 'text',
    });
    expect(fields[3]).toMatchObject({
      name: 'slugManualOverride',
      type: 'checkbox',
    });
  });

  it('appends slug fields when the source field is not present', () => {
    const config = slugPlugin({
      collections: ['pages'],
    })({
      collections: [
        {
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
          ],
          slug: 'pages',
        },
      ],
    } as never);

    const fieldNames = (config.collections?.[0]?.fields ?? []).flatMap(
      (field) =>
        'name' in field && typeof field.name === 'string' ? [field.name] : [],
    );

    expect(fieldNames).toEqual(['heading', 'slug', 'slugManualOverride']);
  });
});
