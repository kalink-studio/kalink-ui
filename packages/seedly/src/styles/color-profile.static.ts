import { sys, type Tone } from './system-contract.css';
import { toneTokens } from './tone';

export type ContainerLevel = 'low' | 'base' | 'high' | 'top';
export type SurfaceLevel = 'dim' | 'base' | 'bright';
export type StaticColorSource = 'tone' | 'container' | 'surface';
export type StaticColorVariant = 'solid' | 'outline' | 'bare';
export type StaticColorKey = Tone | ContainerLevel | SurfaceLevel;

export interface StaticColorValues {
  foreground: string;
  background: string;
  border: string;
}

export interface StaticToneColorArgs {
  profile: 'static';
  colorSource: 'tone';
  colorKey: Tone;
  variant: StaticColorVariant;
}

export interface StaticContainerColorArgs {
  profile: 'static';
  colorSource: 'container';
  colorKey: ContainerLevel;
  variant: StaticColorVariant;
}

export interface StaticSurfaceColorArgs {
  profile: 'static';
  colorSource: 'surface';
  colorKey: SurfaceLevel;
  variant: StaticColorVariant;
}

export type StaticColorArgs =
  | StaticToneColorArgs
  | StaticContainerColorArgs
  | StaticSurfaceColorArgs;

const containerLevelTokens = {
  low: sys.color.container.low,
  base: sys.color.container.base,
  high: sys.color.container.high,
  top: sys.color.container.top,
} as const satisfies Record<ContainerLevel, string>;

const surfaceLevelTokens = {
  dim: sys.color.surface.dim,
  base: sys.color.surface.base,
  bright: sys.color.surface.bright,
} as const satisfies Record<SurfaceLevel, string>;

const getSubtleOutline = (baseColor: string) => {
  return `color-mix(in srgb, ${sys.color.content.base} calc(${sys.state.muted.text} * 100%), ${baseColor})`;
};

const getToneStaticColorValues = (
  colorKey: Tone,
  variant: StaticColorVariant,
): StaticColorValues => {
  const tokens = toneTokens[colorKey];

  if (variant === 'solid') {
    return {
      foreground: tokens.onBase,
      background: tokens.base,
      border: 'transparent',
    };
  }

  if (variant === 'outline') {
    return {
      foreground: tokens.base,
      background: 'transparent',
      border: tokens.base,
    };
  }

  if (variant === 'bare') {
    return {
      foreground: tokens.base,
      background: 'transparent',
      border: 'transparent',
    };
  }

  throw new Error(`Unsupported static tone variant: ${variant}`);
};

const getScaleStaticColorValues = (
  baseColor: string,
  variant: StaticColorVariant,
): StaticColorValues => {
  if (variant === 'solid') {
    return {
      foreground: sys.color.content.base,
      background: baseColor,
      border: 'transparent',
    };
  }

  if (variant === 'outline') {
    return {
      foreground: sys.color.content.base,
      background: 'transparent',
      border: getSubtleOutline(baseColor),
    };
  }

  if (variant === 'bare') {
    return {
      foreground: sys.color.content.base,
      background: 'transparent',
      border: 'transparent',
    };
  }

  throw new Error(`Unsupported static scale variant: ${variant}`);
};

export const resolveStaticColorProfileValues = (
  args: StaticColorArgs,
): StaticColorValues => {
  if (args.colorSource === 'tone') {
    return getToneStaticColorValues(args.colorKey, args.variant);
  }

  if (args.colorSource === 'container') {
    return getScaleStaticColorValues(
      containerLevelTokens[args.colorKey],
      args.variant,
    );
  }

  return getScaleStaticColorValues(
    surfaceLevelTokens[args.colorKey],
    args.variant,
  );
};
