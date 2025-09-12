import { describe, expect, it } from 'vitest';

import {
  toFluidClamp,
  toFluidClampFor,
  getInterpolationFor,
  type Interval,
} from '../../styles/scale';

// Removed computeExponentialScale tests in favor of per-value interpolation.

describe('getInterpolationFor', () => {
  it('maps endpoints and midpoint with exponent easing', () => {
    const opts = {
      lowMin: 12,
      lowMax: 64,
      highMin: 12,
      highMax: 200,
      exponent: 2,
      rounding: 'none' as const,
    };

    const atLow = getInterpolationFor(12, opts);
    const atHigh = getInterpolationFor(64, opts);
    const atMid = getInterpolationFor((12 + 64) / 2, opts); // t=0.5 -> eased=0.25

    expect(atLow).toBeCloseTo(12, 6);
    expect(atHigh).toBeCloseTo(200, 6);
    // 12 + 0.25 * (200 - 12) = 12 + 47 = 59
    expect(atMid).toBeCloseTo(59, 6);
  });

  it('clamps input by default', () => {
    const opts = {
      lowMin: 12,
      lowMax: 64,
      highMin: 12,
      highMax: 200,
      exponent: 1,
      rounding: 'none' as const,
    };

    const below = getInterpolationFor(8, opts); // clamped to 12 -> maps to 12
    const above = getInterpolationFor(100, opts); // clamped to 64 -> maps to 200

    expect(below).toBeCloseTo(12, 6);
    expect(above).toBeCloseTo(200, 6);
  });

  it('respects ensureGteInput to avoid output < input', () => {
    const base = {
      lowMin: 12,
      lowMax: 64,
      highMin: 10, // lower than lowMin
      highMax: 200,
      exponent: 1,
      rounding: 'none' as const,
    };

    const ensured = getInterpolationFor(12, { ...base, ensureGteInput: true });
    const notEnsured = getInterpolationFor(12, {
      ...base,
      ensureGteInput: false,
    });

    expect(ensured).toBeGreaterThanOrEqual(12);
    expect(notEnsured).toBeCloseTo(10, 6);
  });

  it('applies rounding modes', () => {
    const base = {
      lowMin: 0,
      lowMax: 100,
      highMin: 0,
      highMax: 1,
      exponent: 1,
    };

    const vNone = getInterpolationFor(50, {
      ...base,
      rounding: 'none',
      ensureGteInput: false,
    }); // 0.5
    const vFloor = getInterpolationFor(50, {
      ...base,
      rounding: 'floor',
      ensureGteInput: false,
    }); // 0
    const vCeil = getInterpolationFor(50, {
      ...base,
      rounding: 'ceil',
      ensureGteInput: false,
    }); // 1
    const vRound = getInterpolationFor(50, {
      ...base,
      rounding: 'round',
      ensureGteInput: false,
    }); // 1

    expect(vNone).toBeCloseTo(0.5, 6);
    expect(vFloor).toBe(0);
    expect(vCeil).toBe(1);
    expect(vRound).toBe(1);
  });
});

describe('toFluidClamp', () => {
  it('formats clamp with rem by default using viewport interpolation', () => {
    const pair: Interval = [16, 32];

    const expr = toFluidClamp(pair);

    // Contains expected parts
    expect(expr).toContain('clamp(');
    expect(expr).toContain('1rem');
    expect(expr).toContain('2rem');
    expect(expr).toContain('100vw');
    expect(expr).toContain('(80 - 23.5)');
  });

  it('supports px unit', () => {
    const expr = toFluidClamp([20, 40], { unit: 'px' });

    expect(expr).toContain('20px');
    expect(expr).toContain('40px');
  });
});

describe('toFluidClampFor', () => {
  it('creates clamp for a single value with viewport interpolation', () => {
    const expr = toFluidClampFor(16, {
      lowMin: 12,
      lowMax: 64,
      highMin: 12,
      highMax: 200,
      exponent: 2,
      rounding: 'none',
      unit: 'rem',
      baseFontSize: 16,
      interpolateFrom: 23.5,
      interpolateTo: 80,
    });

    expect(expr).toContain('clamp(');
    expect(expr).toContain('100vw');
    expect(expr).toContain('(80 - 23.5)');
    expect(expr).toContain('rem');
  });
});
