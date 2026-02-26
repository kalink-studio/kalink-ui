import { stateColor } from './state-color';
import { sys, type Tone } from './system-contract.css';
import { toneTokens } from './tone';

export type ColorTone = Tone;
export type ActionColorVariant = 'solid' | 'outline' | 'ghost';

export interface ActionColorValues {
  foreground: string;
  background: string;
  border: string;
  focusRing: string;

  hoverForeground: string;
  hoverBackground: string;
  hoverBorder: string;

  activeForeground: string;
  activeBackground: string;
  activeBorder: string;

  disabledForeground: string;
  disabledBackground: string;
  disabledBorder: string;

  loadingForeground: string;
  loadingBackground: string;
  loadingBorder: string;
}

export interface ActionColorArgs {
  profile: 'action';
  colorSource: 'tone';
  colorKey: ColorTone;
  variant: ActionColorVariant;
}

type InteractionState = 'hover' | 'active';
type InteractionIntensity = 'subtle' | 'standard' | 'strong';

const stateLayer = (toneColor: string, opacity: string) => {
  return `color-mix(in srgb, ${toneColor} calc(100% * ${opacity}), transparent)`;
};

const mixWithOpacity = (
  baseColor: string,
  overlayColor: string,
  opacity: string,
) => {
  return `color-mix(in srgb, ${overlayColor} calc(100% * ${opacity}), ${baseColor})`;
};

const deriveOpacity = (baseline: string, factor: number) => {
  return `clamp(0, calc(${baseline} * ${factor}), 1)`;
};

const actionInteractionOpacities = {
  hover: {
    subtle: deriveOpacity(sys.state.hovered.opacity, 0.5),
    standard: sys.state.hovered.opacity,
    strong: deriveOpacity(sys.state.hovered.opacity, 4),
  },
  active: {
    subtle: deriveOpacity(sys.state.pressed.opacity, 0.75),
    standard: sys.state.pressed.opacity,
    strong: deriveOpacity(sys.state.pressed.opacity, 1.5),
  },
} as const satisfies Record<
  InteractionState,
  Record<InteractionIntensity, string>
>;

const actionVariantIntensities = {
  solid: {
    hover: 'strong',
    active: 'strong',
  },
  outline: {
    hover: 'subtle',
    active: 'standard',
  },
  ghost: {
    hover: 'standard',
    active: 'standard',
  },
} as const satisfies Record<
  ActionColorVariant,
  Record<InteractionState, InteractionIntensity>
>;

const getActionVariantOpacities = (variant: ActionColorVariant) => {
  return {
    hoverOpacity:
      actionInteractionOpacities.hover[actionVariantIntensities[variant].hover],
    activeOpacity:
      actionInteractionOpacities.active[
        actionVariantIntensities[variant].active
      ],
  };
};

const getActionColorValues = (
  tone: ColorTone,
  variant: ActionColorVariant,
): ActionColorValues => {
  const tokens = toneTokens[tone];

  if (variant === 'solid') {
    const { hoverOpacity, activeOpacity } = getActionVariantOpacities(variant);

    return {
      foreground: tokens.onBase,
      background: tokens.base,
      border: tokens.base,
      focusRing: tokens.base,

      hoverForeground: tokens.onBase,
      hoverBackground: mixWithOpacity(tokens.base, tokens.onBase, hoverOpacity),
      hoverBorder: mixWithOpacity(tokens.base, tokens.onBase, hoverOpacity),

      activeForeground: tokens.onBase,
      activeBackground: mixWithOpacity(
        tokens.base,
        tokens.onBase,
        activeOpacity,
      ),
      activeBorder: mixWithOpacity(tokens.base, tokens.onBase, activeOpacity),

      disabledForeground: stateColor.disabledContent,
      disabledBackground: sys.color.container.base,
      disabledBorder: 'transparent',

      loadingForeground: tokens.onBase,
      loadingBackground: tokens.container,
      loadingBorder: tokens.container,
    };
  }

  if (variant === 'outline') {
    const { hoverOpacity, activeOpacity } = getActionVariantOpacities(variant);

    return {
      foreground: tokens.base,
      background: 'transparent',
      border: tokens.base,
      focusRing: tokens.base,

      hoverForeground: tokens.base,
      hoverBackground: stateLayer(tokens.base, hoverOpacity),
      hoverBorder: tokens.base,

      activeForeground: tokens.base,
      activeBackground: stateLayer(tokens.base, activeOpacity),
      activeBorder: tokens.base,

      disabledForeground: stateColor.disabledContent,
      disabledBackground: 'transparent',
      disabledBorder: stateColor.disabledContent,

      loadingForeground: tokens.base,
      loadingBackground: stateLayer(tokens.base, hoverOpacity),
      loadingBorder: tokens.base,
    };
  }

  if (variant === 'ghost') {
    const { hoverOpacity, activeOpacity } = getActionVariantOpacities(variant);

    return {
      foreground: tokens.base,
      background: 'transparent',
      border: 'transparent',
      focusRing: tokens.base,

      hoverForeground: tokens.base,
      hoverBackground: stateLayer(tokens.base, hoverOpacity),
      hoverBorder: 'transparent',

      activeForeground: tokens.base,
      activeBackground: stateLayer(tokens.base, activeOpacity),
      activeBorder: 'transparent',

      disabledForeground: stateColor.disabledContent,
      disabledBackground: 'transparent',
      disabledBorder: 'transparent',

      loadingForeground: tokens.base,
      loadingBackground: stateLayer(tokens.base, hoverOpacity),
      loadingBorder: 'transparent',
    };
  }

  throw new Error(`Unsupported action variant: ${variant}`);
};

export const resolveActionColorProfileValues = (
  args: ActionColorArgs,
): ActionColorValues => {
  return getActionColorValues(args.colorKey, args.variant);
};
