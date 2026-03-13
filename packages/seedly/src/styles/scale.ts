export type Interval = [number, number];

/**
 * Common easing and rounding options used by interpolation helpers.
 */
export interface ExponentialScaleOptions {
  exponent?: number;
  minStep?: number;
  rounding?: 'none' | 'round' | 'floor' | 'ceil';
}

export interface DynamicInterpolationOptions extends ExponentialScaleOptions {
  lowMin: number;
  lowMax: number;
  highMin: number;
  highMax: number;
  clampInput?: boolean;
  ensureGteInput?: boolean;
}

export interface FluidClampOptions {
  unit?: 'rem' | 'px';
  baseFontSize?: number;
  interpolateFrom?: number;
  interpolateTo?: number;
}

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
  extends DynamicInterpolationOptions, FluidClampOptions {}

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
