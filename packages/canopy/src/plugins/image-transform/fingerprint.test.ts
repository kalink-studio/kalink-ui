import { describe, expect, it } from 'vitest';

import {
  buildImageTransformFingerprint,
  getImageTransformRelationID,
  getImageTransformRelationScalarID,
  getImageTransformSourceVersion,
} from './fingerprint';

const preset = {
  aspectRatio: '16:9',
  key: 'landscape',
  label: 'Landscape',
} as const;

describe('image transform fingerprint helpers', () => {
  it('builds the same intent fingerprint across relation shapes', () => {
    const populatedSource = {
      filename: 'hero.jpg',
      id: 1,
      relationTo: 'media',
      updatedAt: '2026-03-11T10:00:00.000Z',
      url: 'http://localhost:3000/api/media/file/hero.jpg',
    };
    const idOnlySource = {
      relationTo: 'media',
      value: 1,
    };

    expect(
      buildImageTransformFingerprint({
        crop: { x: 50, y: 40, zoom: 1.2 },
        preset,
        source: populatedSource,
      }),
    ).toBe(
      buildImageTransformFingerprint({
        crop: { x: 50, y: 40, zoom: 1.2 },
        preset,
        source: idOnlySource,
      }),
    );
  });

  it('changes the fingerprint when crop intent changes', () => {
    const source = { id: 1, relationTo: 'media' };

    expect(
      buildImageTransformFingerprint({
        crop: { x: 50, y: 40, zoom: 1 },
        preset,
        source,
      }),
    ).not.toBe(
      buildImageTransformFingerprint({
        crop: { x: 50, y: 41, zoom: 1 },
        preset,
        source,
      }),
    );
  });

  it('extracts relation ids in both string and scalar form', () => {
    const value = { relationTo: 'media', value: { id: 42 } };

    expect(getImageTransformRelationScalarID(value)).toBe(42);
    expect(getImageTransformRelationID(value)).toBe('42');
  });

  it('derives source version from populated relations only', () => {
    expect(
      getImageTransformSourceVersion({
        id: 1,
        updatedAt: '2026-03-11T10:00:00.000Z',
      }),
    ).toBe('2026-03-11T10:00:00.000Z');
    expect(
      getImageTransformSourceVersion({ relationTo: 'media', value: 1 }),
    ).toBe(undefined);
  });
});
