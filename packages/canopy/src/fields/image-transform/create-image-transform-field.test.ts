import { describe, expect, it } from 'vitest';

import { buildImageTransformFingerprint } from '../../plugins/image-transform/fingerprint.js';

import { createImageTransformField } from './create-image-transform-field.js';

import type { ImageTransformFieldValue } from './types.js';

interface DbNamedFieldLike {
  readonly dbName?: string;
  readonly enumName?: string;
  readonly fields?: readonly DbNamedFieldLike[];
  readonly name?: string;
}

const getFieldByName = (
  fields: readonly DbNamedFieldLike[],
  name: string,
): DbNamedFieldLike => {
  const field = fields.find((candidate) => candidate.name === name);

  if (!field) {
    throw new Error(`Field "${name}" not found.`);
  }

  return field;
};

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

describe('createImageTransformField db naming', () => {
  it('adds short deterministic db names without changing public names', () => {
    const field = createImageTransformField({
      name: 'heroImage',
      presets: [
        { aspectRatio: '16:9', key: 'landscape' },
        { aspectRatio: '1:1', key: 'marketing_banner_super_long' },
      ],
      relationTo: 'media',
    }) as unknown as DbNamedFieldLike;

    expect(field.name).toBe('heroImage');
    expect(field.dbName).toMatch(/^it_[a-z0-9]+_[a-z0-9]{5}$/);
    expect(field.dbName?.length).toBeLessThanOrEqual(18);

    const sourceField = getFieldByName(field.fields ?? [], 'source');
    const presetsField = getFieldByName(field.fields ?? [], 'presets');
    const landscapeField = getFieldByName(
      presetsField.fields ?? [],
      'landscape',
    );
    const longPresetField = getFieldByName(
      presetsField.fields ?? [],
      'marketing_banner_super_long',
    );
    const cropField = getFieldByName(landscapeField.fields ?? [], 'crop');
    const derivativeField = getFieldByName(
      landscapeField.fields ?? [],
      'derivative',
    );
    const stateField = getFieldByName(landscapeField.fields ?? [], 'state');
    const fingerprintField = getFieldByName(
      landscapeField.fields ?? [],
      'fingerprint',
    );
    const sourceVersionField = getFieldByName(
      landscapeField.fields ?? [],
      'sourceVersion',
    );
    const lastGeneratedAtField = getFieldByName(
      landscapeField.fields ?? [],
      'lastGeneratedAt',
    );
    const lastErrorField = getFieldByName(
      landscapeField.fields ?? [],
      'lastError',
    );
    const zoomField = getFieldByName(cropField.fields ?? [], 'zoom');

    expect(sourceField.dbName).toBe('src');
    expect(presetsField.dbName).toBe('pr');
    expect(landscapeField.dbName).toMatch(/^p_[a-z0-9]+_[a-z0-9]{5}$/);
    expect(longPresetField.dbName).toMatch(/^p_[a-z0-9]+_[a-z0-9]{5}$/);
    expect(landscapeField.dbName).not.toBe(longPresetField.dbName);
    expect(cropField.dbName).toBe('cr');
    expect(derivativeField.dbName).toBe('drv');
    expect(stateField.dbName).toBe('st');
    expect(stateField.enumName).toMatch(/^itst_[a-z0-9]+_[a-z0-9]{5}$/);
    expect(fingerprintField.dbName).toBe('fp');
    expect(sourceVersionField.dbName).toBe('sv');
    expect(lastGeneratedAtField.dbName).toBe('lga');
    expect(lastErrorField.dbName).toBe('le');
    expect(zoomField.dbName).toBe('zm');
  });

  it('uses the caller provided root db name override', () => {
    const field = createImageTransformField({
      dbName: 'img',
      name: 'heroImage',
      presets: [{ aspectRatio: '16:9', key: 'landscape' }],
      relationTo: 'media',
    }) as unknown as DbNamedFieldLike;

    expect(field.name).toBe('heroImage');
    expect(field.dbName).toBe('img');
  });

  it('keeps deep nested image transform db names compact for versioned schemas', () => {
    const screenshotField = createImageTransformField({
      name: 'screenshot',
      presets: [
        { aspectRatio: '1:1', key: '1_1' },
        { aspectRatio: '2:3', key: '2_3' },
      ],
      relationTo: 'media',
    }) as unknown as DbNamedFieldLike;

    const pagesCollection = {
      fields: [
        {
          blocks: [
            {
              fields: [
                {
                  fields: [screenshotField],
                  name: 'items',
                  type: 'array',
                },
              ],
              slug: 'linkList',
            },
          ],
          name: 'layout',
          type: 'blocks',
        },
      ],
      slug: 'pages',
      versions: { drafts: true },
    } as const;

    const screenshot = pagesCollection.fields[0].blocks[0].fields[0]
      .fields[0] as DbNamedFieldLike;
    const presetsField = getFieldByName(screenshot.fields ?? [], 'presets');
    const oneToOneField = getFieldByName(presetsField.fields ?? [], '1_1');
    const twoToThreeField = getFieldByName(presetsField.fields ?? [], '2_3');
    const oneToOneStateField = getFieldByName(
      oneToOneField.fields ?? [],
      'state',
    );
    const twoToThreeStateField = getFieldByName(
      twoToThreeField.fields ?? [],
      'state',
    );

    expect(screenshot.name).toBe('screenshot');
    expect(screenshot.dbName?.length).toBeLessThanOrEqual(18);
    expect(presetsField.dbName).toBe('pr');
    expect(oneToOneField.dbName?.length).toBeLessThanOrEqual(18);
    expect(twoToThreeField.dbName?.length).toBeLessThanOrEqual(18);
    expect(oneToOneStateField.dbName).toBe('st');
    expect(twoToThreeStateField.dbName).toBe('st');
    expect(oneToOneStateField.enumName?.length).toBeLessThanOrEqual(24);
    expect(twoToThreeStateField.enumName?.length).toBeLessThanOrEqual(24);
    expect(oneToOneStateField.enumName).not.toBe(twoToThreeStateField.enumName);
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
