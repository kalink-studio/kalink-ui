import { describe, expect, it, vi } from 'vitest';

import { createImageTransformField } from '../../fields/image-transform';

import {
  cleanupOwnerDerivatives,
  cleanupReplacedDerivatives,
  cleanupSourceDerivatives,
  deleteDerivativeByID,
} from './cleanup';

describe('image transform cleanup helpers', () => {
  it('deletes removed derivatives when owner docs change', async () => {
    const field = createImageTransformField({
      name: 'heroImage',
      presets: [{ aspectRatio: '16:9', key: 'landscape' }],
      relationTo: 'media',
    });
    const payload = {
      delete: vi.fn().mockResolvedValue(undefined),
    };
    const req = { payload } as never;

    await cleanupReplacedDerivatives({
      derivativeCollectionSlug: 'mediaDerivatives',
      fields: [field],
      nextDoc: {
        heroImage: {
          presets: {
            landscape: {},
          },
          source: 1,
        },
      },
      previousDoc: {
        heroImage: {
          presets: {
            landscape: {
              derivative: { id: 7 },
            },
          },
          source: 1,
        },
      },
      req,
    });

    expect(payload.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'mediaDerivatives',
        id: 7,
      }),
    );
  });

  it('deletes removed derivatives when the owner field becomes an empty object', async () => {
    const field = createImageTransformField({
      name: 'heroImage',
      presets: [{ aspectRatio: '16:9', key: 'landscape' }],
      relationTo: 'media',
    });
    const payload = {
      delete: vi.fn().mockResolvedValue(undefined),
    };
    const req = { payload } as never;

    await cleanupReplacedDerivatives({
      derivativeCollectionSlug: 'mediaDerivatives',
      fields: [field],
      nextDoc: {
        heroImage: {},
      },
      previousDoc: {
        heroImage: {
          presets: {
            landscape: {
              derivative: { id: 7 },
            },
          },
          source: 1,
        },
      },
      req,
    });

    expect(payload.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'mediaDerivatives',
        id: 7,
      }),
    );
  });

  it('tolerates missing derivatives when allowMissing is enabled', async () => {
    await expect(
      deleteDerivativeByID({
        allowMissing: true,
        derivativeCollectionSlug: 'mediaDerivatives',
        id: 7,
        req: {
          payload: {
            delete: vi.fn().mockRejectedValue(new Error('Document not found')),
          },
        } as never,
      }),
    ).resolves.toBeUndefined();
  });

  it('deletes owner and source derivatives by query', async () => {
    const payload = {
      delete: vi.fn().mockResolvedValue(undefined),
    };
    const req = { payload } as never;

    await cleanupOwnerDerivatives({
      derivativeCollectionSlug: 'mediaDerivatives',
      ownerID: '42',
      ownerKind: 'collection',
      ownerSlug: 'pages',
      req,
    });
    await cleanupSourceDerivatives({
      derivativeCollectionSlug: 'mediaDerivatives',
      req,
      sourceCollection: 'media',
      sourceID: '12',
    });

    expect(payload.delete).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        where: {
          ownerID: { equals: '42' },
          ownerKind: { equals: 'collection' },
          ownerSlug: { equals: 'pages' },
        },
      }),
    );
    expect(payload.delete).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        where: {
          sourceCollection: { equals: 'media' },
          sourceID: { equals: '12' },
        },
      }),
    );
  });
});
