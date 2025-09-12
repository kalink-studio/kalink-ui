export type Interval = [number, number];

/**
 * Common easing/rounding options used by the interpolation helpers.
 * Note: `minStep` is ignored in single-value mapping but kept for backward
 * compatibility of the public types.
 */
export interface ExponentialScaleOptions {
  exponent?: number; // 1 = linear, >1 = ease-in, <1 = ease-out
  minStep?: number; // kept for compatibility; not used by per-value mapping
  rounding?: 'none' | 'round' | 'floor' | 'ceil';
}

export interface DynamicInterpolationOptions extends ExponentialScaleOptions {
  lowMin: number;
  lowMax: number;
  highMin: number;
  highMax: number;
  clampInput?: boolean; // clamp input inside [lowMin, lowMax]
  ensureGteInput?: boolean; // ensure output >= input
}

export interface FluidClampOptions {
  unit?: 'rem' | 'px';
  baseFontSize?: number; // px per rem when unit is 'rem'
  interpolateFrom?: number; // defaults to 23.5 (in `unit`)
  interpolateTo?: number; // defaults to 80 (in `unit`)
}

/**
 * Format a `[min, max]` pair into a CSS clamp() with viewport-based interpolation:
 * clamp(min, calc(min + (max - min) * ((100vw - from) / (to - from))), max)
 *
 * - `from`/`to` default to 23.5 and 80 (in the selected `unit`).
 * - `unit` may be 'rem' (default) or 'px'. When 'rem', values are converted from px
 *   using `baseFontSize` (default 16).
 */
export function toFluidClamp(
  [min, max]: Interval,
  options: FluidClampOptions = {},
): string {
  const unit = options.unit ?? 'rem';
  const base = options.baseFontSize ?? 16;
  const from = options.interpolateFrom ?? 23.5;
  const to = options.interpolateTo ?? 80;

  const toUnit = (px: number): number => {
    if (unit === 'px') {
      return px;
    }

    return px / base;
  };

  const minU = toUnit(min);
  const maxU = toUnit(max);
  const diffU = maxU - minU;

  const interp = `((100vw - ${from}${unit}) / (${to} - ${from}))`;

  return `clamp(${minU}${unit}, calc(${minU}${unit} + (${diffU} * ${interp})), ${maxU}${unit})`;
}

// Batch scale helpers were removed in favor of per-value mapping.

/**
 * Map a single `value` from [lowMin, lowMax] to [highMin, highMax] using
 * exponential easing. Optionally rounds, clamps input, and ensures the output
 * is not below the input (enabled by default).
 */
export function getInterpolationFor(
  value: number,
  {
    lowMin,
    lowMax,
    highMin,
    highMax,
    exponent = 2,
    rounding = 'round',
    clampInput = true,
    ensureGteInput = true,
  }: DynamicInterpolationOptions,
): number {
  if (lowMax === lowMin) {
    throw new Error('getInterpolationFor: lowMin and lowMax must differ.');
  }

  const clamp = (v: number, min: number, max: number): number => {
    if (v < min) {
      return min;
    }

    if (v > max) {
      return max;
    }

    return v;
  };

  const round = (v: number): number => {
    if (rounding === 'none') {
      return v;
    }

    if (rounding === 'floor') {
      return Math.floor(v);
    }

    if (rounding === 'ceil') {
      return Math.ceil(v);
    }

    return Math.round(v);
  };

  const input = clampInput ? clamp(value, lowMin, lowMax) : value;

  const t = (input - lowMin) / (lowMax - lowMin);
  const eased = Math.pow(t, exponent);
  const mapped = highMin + eased * (highMax - highMin);

  let result = round(mapped);

  if (ensureGteInput && result < input) {
    result = input;
  }

  return result;
}

export interface FluidClampForOptions
  extends DynamicInterpolationOptions,
    FluidClampOptions {}

/**
 * Convenience to produce a CSS clamp() for a single `value` by first computing
 * its mapped high value via `getInterpolationFor`, then formatting with
 * `toFluidClamp` using viewport interpolation.
 */
export function toFluidClampFor(
  value: number,
  { unit = 'rem', baseFontSize = 16, ...opts }: FluidClampForOptions,
): string {
  return toFluidClamp([value, getInterpolationFor(value, opts)], {
    unit,
    baseFontSize,
    ...opts,
  });
}
