import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createImageTransformField } from '../../fields/image-transform';

import { buildImageTransformFingerprint } from './fingerprint';
import { generateDerivative } from './generate-derivative';
import { imageTransformPlugin } from './image-transform-plugin';

vi.mock('./generate-derivative', () => ({
  generateDerivative: vi.fn(),
}));

const mockedGenerateDerivative = vi.mocked(generateDerivative);

const createPluginConfig = () =>
  imageTransformPlugin({
    defaultSourceRelationTo: 'media',
    derivativeCollectionSlug: 'mediaDerivatives',
  })({
    collections: [
      {
        fields: [
          createImageTransformField({
            name: 'heroImage',
            presets: [{ aspectRatio: '16:9', key: 'landscape' }],
            relationTo: 'media',
          }),
        ],
        slug: 'pages',
        versions: {
          drafts: true,
        },
      },
    ],
  } as never);

const getHandler = () => {
  const config = createPluginConfig();
  const endpoint = config.endpoints?.find(
    (candidate) => candidate.path === '/image-transform',
  );

  if (!endpoint) {
    throw new Error('Image transform endpoint was not registered.');
  }

  return endpoint.handler;
};

const getHeroImageBeforeChangeHook = () => {
  const config = createPluginConfig();
  const field = config.collections?.[0]?.fields?.find(
    (candidate) => 'name' in candidate && candidate.name === 'heroImage',
  ) as
    | {
        hooks?: {
          beforeChange?: ((args: {
            previousValue?: unknown;
            value?: unknown;
          }) => unknown)[];
        };
      }
    | undefined;

  const hook = field?.hooks?.beforeChange?.[0];

  if (!hook) {
    throw new Error('Hero image beforeChange hook is missing.');
  }

  return hook;
};

const normalizeHeroImageValue = (
  previousValue: unknown,
  value: unknown,
): unknown => getHeroImageBeforeChangeHook()({ previousValue, value });

const mergeRecords = (
  current: Record<string, unknown>,
  incoming: Record<string, unknown>,
): Record<string, unknown> => {
  const next = { ...current };

  for (const [key, value] of Object.entries(incoming)) {
    if (value === null) {
      next[key] = null;
      continue;
    }

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      next[key] &&
      typeof next[key] === 'object' &&
      !Array.isArray(next[key])
    ) {
      next[key] = mergeRecords(
        next[key] as Record<string, unknown>,
        value as Record<string, unknown>,
      );
      continue;
    }

    next[key] = value;
  }

  return next;
};

describe('imageTransformPlugin endpoint', () => {
  beforeEach(() => {
    mockedGenerateDerivative.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates a derivative and persists ready state', async () => {
    let currentDoc: Record<string, unknown> = {
      heroImage: {
        presets: {
          landscape: {
            crop: { x: 50, y: 60, zoom: 1 },
            state: 'stale',
          },
        },
        source: {
          id: 1,
          relationTo: 'media',
          updatedAt: '2026-03-11T10:00:00.000Z',
        },
      },
      id: 1,
    };
    const update = vi.fn(
      async ({ data }: { data: Record<string, unknown> }) => {
        const previousHeroImage = currentDoc.heroImage;
        currentDoc = mergeRecords(currentDoc, data);
        currentDoc.heroImage = normalizeHeroImageValue(
          previousHeroImage,
          currentDoc.heroImage,
        );

        return currentDoc;
      },
    );
    const req = {
      json: vi.fn().mockResolvedValue({
        action: 'generate',
        collectionSlug: 'pages',
        dataPath: 'heroImage',
        fieldValue: currentDoc.heroImage,
        id: 1,
        presetKeys: ['landscape'],
      }),
      payload: {
        config: {
          sharp: {},
        },
        create: vi.fn(),
        delete: vi.fn(),
        findByID: vi.fn(async () => currentDoc),
        update,
      },
    } as never;

    const expectedFingerprint = buildImageTransformFingerprint({
      crop: { x: 50, y: 60, zoom: 1 },
      preset: { aspectRatio: '16:9', key: 'landscape' },
      source: {
        id: 1,
        relationTo: 'media',
        updatedAt: '2026-03-11T10:00:00.000Z',
      },
    });

    mockedGenerateDerivative.mockResolvedValue({
      derivativeDoc: {
        fingerprint: expectedFingerprint,
        id: 9,
        sourceVersion: '2026-03-11T10:00:00.000Z',
      },
      fingerprint: expectedFingerprint,
      sourceVersion: '2026-03-11T10:00:00.000Z',
    });

    const response = await getHandler()(req);
    const json = await response.json();

    expect(mockedGenerateDerivative).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(json.generatedPresetKeys).toEqual(['landscape']);
    expect(json.value.presets.landscape.state).toBe('ready');
    expect(json.value.presets.landscape.derivative.id).toBe(9);
  });

  it('documents that omitting a preset key does not clear it under nested merge semantics', () => {
    const currentDoc = {
      heroImage: {
        presets: {
          landscape: {
            derivative: { id: 7 },
            fingerprint: 'intent-1',
            sourceVersion: '2026-03-11T10:00:00.000Z',
            state: 'ready',
          },
          portrait: {
            state: 'missing',
          },
        },
        source: {
          id: 1,
          relationTo: 'media',
          updatedAt: '2026-03-11T10:00:00.000Z',
        },
      },
    };

    const merged = mergeRecords(currentDoc, {
      heroImage: {
        presets: {
          portrait: {
            state: 'missing',
          },
        },
      },
    });

    expect(
      (merged.heroImage as { presets: Record<string, unknown> }).presets
        .landscape,
    ).toEqual({
      derivative: { id: 7 },
      fingerprint: 'intent-1',
      sourceVersion: '2026-03-11T10:00:00.000Z',
      state: 'ready',
    });
  });

  it('deletes the old derivative after a successful regenerate', async () => {
    let currentDoc: Record<string, unknown> = {
      heroImage: {
        presets: {
          landscape: {
            crop: { x: 50, y: 70, zoom: 1 },
            derivative: { id: 7 },
            fingerprint: 'old',
            sourceVersion: '2026-03-11T10:00:00.000Z',
            state: 'stale',
          },
        },
        source: {
          id: 1,
          relationTo: 'media',
          updatedAt: '2026-03-11T10:00:00.000Z',
        },
      },
      id: 1,
    };
    const payloadDelete = vi.fn().mockResolvedValue(undefined);
    const req = {
      json: vi.fn().mockResolvedValue({
        action: 'generate',
        collectionSlug: 'pages',
        dataPath: 'heroImage',
        fieldValue: currentDoc.heroImage,
        id: 1,
        presetKeys: ['landscape'],
      }),
      payload: {
        config: { sharp: {} },
        create: vi.fn(),
        delete: payloadDelete,
        findByID: vi.fn(async () => currentDoc),
        update: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
          const previousHeroImage = currentDoc.heroImage;
          currentDoc = mergeRecords(currentDoc, data);
          currentDoc.heroImage = normalizeHeroImageValue(
            previousHeroImage,
            currentDoc.heroImage,
          );

          return currentDoc;
        }),
      },
    } as never;

    mockedGenerateDerivative.mockResolvedValue({
      derivativeDoc: {
        fingerprint: 'new',
        id: 9,
        sourceVersion: '2026-03-11T10:00:00.000Z',
      },
      fingerprint: 'new',
      sourceVersion: '2026-03-11T10:00:00.000Z',
    });

    await getHandler()(req);

    expect(payloadDelete).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'mediaDerivatives',
        id: 7,
      }),
    );
  });

  it('clears the preset entry and deletes the derivative', async () => {
    let currentDoc: Record<string, unknown> = {
      heroImage: {
        presets: {
          landscape: {
            crop: { x: 50, y: 50, zoom: 1 },
            derivative: { id: 7 },
            fingerprint: 'intent-1',
            sourceVersion: '2026-03-11T10:00:00.000Z',
            state: 'ready',
          },
        },
        source: {
          id: 1,
          relationTo: 'media',
          updatedAt: '2026-03-11T10:00:00.000Z',
        },
      },
      id: 1,
    };
    const payloadDelete = vi.fn().mockResolvedValue(undefined);
    const req = {
      json: vi.fn().mockResolvedValue({
        action: 'clear',
        collectionSlug: 'pages',
        dataPath: 'heroImage',
        fieldValue: currentDoc.heroImage,
        id: 1,
        presetKeys: ['landscape'],
      }),
      payload: {
        config: { sharp: {} },
        create: vi.fn(),
        delete: payloadDelete,
        findByID: vi.fn(async () => currentDoc),
        update: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
          const previousHeroImage = currentDoc.heroImage;
          currentDoc = mergeRecords(currentDoc, data);
          currentDoc.heroImage = normalizeHeroImageValue(
            previousHeroImage,
            currentDoc.heroImage,
          );

          return currentDoc;
        }),
      },
    } as never;

    const response = await getHandler()(req);
    const json = await response.json();

    expect(payloadDelete).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'mediaDerivatives',
        id: 7,
      }),
    );
    expect(json.value.presets).toBeUndefined();
    expect(
      (currentDoc.heroImage as { presets?: Record<string, unknown> }).presets,
    ).toBeUndefined();
  });

  it('normalizes a cleared source image to an empty object', () => {
    const normalized = normalizeHeroImageValue(
      {
        presets: {
          landscape: {
            crop: { x: 50, y: 50, zoom: 1 },
            derivative: { id: 7 },
            fingerprint: 'intent-1',
            sourceVersion: '2026-03-11T10:00:00.000Z',
            state: 'ready',
          },
        },
        source: {
          id: 1,
          relationTo: 'media',
          updatedAt: '2026-03-11T10:00:00.000Z',
        },
      },
      {},
    );

    expect(normalized).toEqual({});
  });

  it('normalizes an explicitly nulled source image to an empty object', () => {
    const normalized = normalizeHeroImageValue(
      {
        presets: {
          landscape: {
            derivative: { id: 7 },
            fingerprint: 'intent-1',
            sourceVersion: '2026-03-11T10:00:00.000Z',
            state: 'ready',
          },
        },
        source: {
          id: 1,
          relationTo: 'media',
          updatedAt: '2026-03-11T10:00:00.000Z',
        },
      },
      {
        source: null,
      },
    );

    expect(normalized).toEqual({});
  });
});
