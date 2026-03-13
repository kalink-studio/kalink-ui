import { describe, expect, it } from 'vitest';

import { buildImageTransformFingerprint } from '../../plugins/image-transform/fingerprint.js';

import { createImageTransformField } from './create-image-transform-field.js';

import type { ImageTransformFieldValue } from './types.js';

const source = {
  id: 1,
  relationTo: 'media',
  updatedAt: '2026-03-11T10:00:00.000Z',
};

const getBeforeChangeHook = (
  field = createImageTransformField({
    name: 'heroImage',
    presets: [{ aspectRatio: '16:9', key: 'landscape' }],
    relationTo: 'media',
  }),
) => {
  const hook = (
    field as unknown as {
      hooks?: {
        beforeChange?: ((args: {
          previousValue?: unknown;
          value?: unknown;
        }) => unknown)[];
      };
    }
  ).hooks?.beforeChange?.[0];

  if (!hook) {
    throw new Error('Image transform beforeChange hook is missing.');
  }

  return hook;
};

const getValidate = (field: unknown) => {
  const validate = (
    field as {
      validate?: (value: unknown, options: unknown) => string | true;
    }
  ).validate;

  if (!validate) {
    throw new Error('Image transform validate function is missing.');
  }

  return validate;
};

describe('createImageTransformField beforeChange hook', () => {
  const hook = getBeforeChangeHook();

  it('returns an empty object when no source image is selected', () => {
    expect(
      hook({ previousValue: undefined, value: { presets: {} } } as never),
    ).toEqual({});
  });

  it('returns an empty object when a populated source image is cleared', () => {
    expect(
      hook({
        previousValue: {
          presets: {
            landscape: {
              crop: { x: 50, y: 50, zoom: 1 },
              derivative: { id: 7 },
              fingerprint: 'intent-1',
              sourceVersion: source.updatedAt,
              state: 'ready',
            },
          },
          source,
        },
        value: {},
      } as never),
    ).toEqual({});
  });

  it('returns an empty object when source is explicitly nulled', () => {
    expect(
      hook({
        previousValue: {
          presets: {
            landscape: {
              derivative: { id: 7 },
              fingerprint: 'intent-1',
              sourceVersion: source.updatedAt,
              state: 'ready',
            },
          },
          source,
        },
        value: {
          presets: {},
          source: null,
        },
      } as never),
    ).toEqual({});
  });

  it('marks a preset ready when derivative metadata matches current intent', () => {
    const fingerprint = buildImageTransformFingerprint({
      crop: { x: 50, y: 50, zoom: 1 },
      preset: { aspectRatio: '16:9', key: 'landscape' },
      source,
    });

    const result = hook({
      previousValue: undefined,
      value: {
        presets: {
          landscape: {
            derivative: {
              fingerprint,
              id: 7,
              sourceVersion: source.updatedAt,
            },
            fingerprint,
            sourceVersion: source.updatedAt,
            state: 'ready',
          },
        },
        source,
      },
    } as never);

    expect(
      (result as ImageTransformFieldValue | undefined)?.presets?.landscape
        ?.state,
    ).toBe('ready');
  });

  it('marks a preset stale when crop intent changes from a ready derivative', () => {
    const previousFingerprint = buildImageTransformFingerprint({
      crop: { x: 50, y: 50, zoom: 1 },
      preset: { aspectRatio: '16:9', key: 'landscape' },
      source,
    });

    const result = hook({
      previousValue: {
        presets: {
          landscape: {
            derivative: { id: 7 },
            fingerprint: previousFingerprint,
            sourceVersion: source.updatedAt,
            state: 'ready',
          },
        },
        source,
      },
      value: {
        presets: {
          landscape: {
            crop: { x: 50, y: 60, zoom: 1 },
            derivative: { id: 7 },
            fingerprint: previousFingerprint,
            sourceVersion: source.updatedAt,
            state: 'ready',
          },
        },
        source,
      },
    } as never);

    expect(
      (result as ImageTransformFieldValue | undefined)?.presets?.landscape
        ?.state,
    ).toBe('stale');
  });

  it('preserves failed state and last error when fingerprint matches', () => {
    const fingerprint = buildImageTransformFingerprint({
      crop: { x: 50, y: 50, zoom: 1 },
      preset: { aspectRatio: '16:9', key: 'landscape' },
      source,
    });

    const result = hook({
      previousValue: {
        presets: {
          landscape: {
            fingerprint,
            lastError: 'boom',
            sourceVersion: source.updatedAt,
            state: 'failed',
          },
        },
        source,
      },
      value: {
        presets: {
          landscape: {
            crop: { x: 50, y: 50, zoom: 1 },
            fingerprint,
            lastError: 'boom',
            sourceVersion: source.updatedAt,
            state: 'failed',
          },
        },
        source,
      },
    } as never);

    expect(
      (result as ImageTransformFieldValue | undefined)?.presets?.landscape
        ?.state,
    ).toBe('failed');
    expect(
      (result as ImageTransformFieldValue | undefined)?.presets?.landscape
        ?.lastError,
    ).toBe('boom');
  });

  it('omits presets that were fully cleared', () => {
    const result = hook({
      previousValue: {
        presets: {
          landscape: {
            derivative: { id: 7 },
            fingerprint: 'old',
            state: 'ready',
          },
        },
        source,
      },
      value: {
        presets: {},
        source,
      },
    } as never);

    expect(
      (result as ImageTransformFieldValue | undefined)?.presets,
    ).toBeUndefined();
  });

  it('omits presets that are explicitly nulled for clearing', () => {
    const result = hook({
      previousValue: {
        presets: {
          landscape: {
            derivative: { id: 7 },
            fingerprint: 'old',
            state: 'ready',
          },
        },
        source,
      },
      value: {
        presets: {
          landscape: null,
        },
        source,
      },
    } as never);

    expect(
      (result as ImageTransformFieldValue | undefined)?.presets,
    ).toBeUndefined();
  });

  it('omits tombstone presets whose leaf fields are explicitly nulled for clearing', () => {
    const result = hook({
      previousValue: {
        presets: {
          landscape: {
            crop: { x: 50, y: 50, zoom: 1 },
            derivative: { id: 7 },
            fingerprint: 'old',
            sourceVersion: source.updatedAt,
            state: 'ready',
          },
        },
        source,
      },
      value: {
        presets: {
          landscape: {
            crop: {
              x: null,
              y: null,
              zoom: null,
            },
            derivative: null,
            fingerprint: null,
            lastError: null,
            lastGeneratedAt: null,
            sourceVersion: null,
            state: null,
          },
        },
        source,
      },
    } as never);

    expect(
      (result as ImageTransformFieldValue | undefined)?.presets,
    ).toBeUndefined();
  });
});

describe('createImageTransformField validate', () => {
  it('accepts an empty object when the field is optional', () => {
    const validate = getValidate(
      createImageTransformField({
        name: 'heroImage',
        presets: [{ aspectRatio: '16:9', key: 'landscape' }],
        relationTo: 'media',
      }),
    );

    expect(
      validate({}, { path: ['heroImage'], req: {}, siblingData: {} } as never),
    ).toBe(true);
  });

  it('rejects an empty object when the field is required', () => {
    const validate = getValidate(
      createImageTransformField({
        name: 'heroImage',
        presets: [{ aspectRatio: '16:9', key: 'landscape' }],
        relationTo: 'media',
        required: true,
      }),
    );

    expect(
      validate({}, { path: ['heroImage'], req: {}, siblingData: {} } as never),
    ).toEqual(expect.any(String));
  });

  it('accepts a populated source when the field is required', () => {
    const validate = getValidate(
      createImageTransformField({
        name: 'heroImage',
        presets: [{ aspectRatio: '16:9', key: 'landscape' }],
        relationTo: 'media',
        required: true,
      }),
    );

    expect(
      validate({ source }, {
        path: ['heroImage'],
        req: {},
        siblingData: {},
      } as never),
    ).toBe(true);
  });
});
