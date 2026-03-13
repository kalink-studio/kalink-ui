import { describe, expect, it } from 'vitest';

import { createImageTransformField } from '../../fields/image-transform/index.js';

import {
  createImageTransformFieldPatch,
  getValueAtPath,
  resolveOwnerContext,
} from './resolve-owner-context.js';

describe('resolveOwnerContext', () => {
  const imageField = createImageTransformField({
    name: 'image',
    presets: [{ aspectRatio: '16:9', key: 'landscape' }],
    relationTo: 'media',
  });
  const entity = {
    fields: [
      {
        blocks: [
          {
            fields: [imageField],
            slug: 'fiftyFifty',
          },
        ],
        name: 'blocks',
        type: 'blocks',
      },
    ],
    slug: 'pages',
  } as const;
  const doc = {
    blocks: [
      {
        blockType: 'fiftyFifty',
        id: 'row-1',
        image: {
          presets: {
            landscape: {
              crop: { x: 50, y: 50, zoom: 1 },
            },
          },
          source: { id: 1, relationTo: 'media' },
        },
      },
    ],
    id: 1,
  };

  it('resolves data, schema, and usage paths for block fields', () => {
    const context = resolveOwnerContext({
      dataPath: 'blocks.0.image',
      doc,
      entity: entity as never,
      ownerID: '1',
      ownerKind: 'collection',
    });

    expect(context.dataPath).toBe('blocks.0.image');
    expect(context.fieldPath).toBe('blocks.fiftyFifty.image');
    expect(context.usagePath).toBe('blocks.row-1.fiftyFifty.image');
    expect(context.relationTo).toBe('media');
    expect(context.value.source).toEqual({ id: 1, relationTo: 'media' });
  });

  it('patches and reads nested image-transform values by data path', () => {
    const nextValue = {
      presets: {
        landscape: {
          crop: { x: 10, y: 20, zoom: 1 },
        },
      },
      source: { id: 2, relationTo: 'media' },
    };

    const patch = createImageTransformFieldPatch({
      data: doc as Record<string, unknown>,
      fieldPath: 'blocks.0.image',
      value: nextValue,
    });
    const merged = {
      ...doc,
      ...patch,
    };

    expect(getValueAtPath(merged, 'blocks.0.image')).toEqual(nextValue);
  });
});
