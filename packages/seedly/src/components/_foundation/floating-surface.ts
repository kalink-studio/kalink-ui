import { type StyleRule } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys } from '../../styles';

export const floatingSurfaceDarkOutlineColor = `color-mix(in srgb, ${sys.color.content.base} 14%, transparent)`;
export const floatingPanelMaxBlockSize = `min(${calc.multiply(sys.spacing[8], 23)}, var(--available-height))`;

export interface FloatingPositionerStylesOptions {
  outline?: string;
  zIndex?: string;
  webkitUserSelect?: 'none';
  userSelect?: 'none';
  vars?: Record<string, string>;
}

export function createFloatingPositionerStyles(
  options: FloatingPositionerStylesOptions = {},
): StyleRule {
  return {
    outline: options.outline ?? '0',
    zIndex: options.zIndex,
    WebkitUserSelect: options.webkitUserSelect,
    userSelect: options.userSelect,
    vars: options.vars,
  };
}

export interface FloatingPopupStylesOptions {
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
  paddingBlock?: string;
  paddingInline?: string;
  transformOrigin?: string;
  transition?: string | null;
  inlineSize?: string;
  blockSize?: string;
  minInlineSize?: string;
  maxInlineSize?: string;
  maxBlockSize?: string;
  backgroundClip?: 'padding-box';
  overflowY?: 'auto';
  lightOutline?: string | null;
  darkOutline?: string | null;
  shadow?: string;
  darkShadow?: string;
  darkOutlineOffset?: string;
  selectors?: Record<string, StyleRule>;
  includeStartingStyle?: boolean;
  includeEndingStyle?: boolean;
  startingStyle?: StyleRule;
  endingStyle?: StyleRule;
}

const defaultFloatingStateStyle = {
  opacity: '0',
  transform: 'scale(0.9)',
} as const;

export function createFloatingPopupStyles(
  options: FloatingPopupStylesOptions = {},
): StyleRule {
  const lightOutline =
    options.lightOutline === null
      ? null
      : (options.lightOutline ?? sys.color.border.low);
  const darkOutline =
    options.darkOutline === null
      ? null
      : (options.darkOutline ?? sys.color.border.low);
  const shadow = options.shadow ?? sys.elevation.moderate;

  const selectors: Record<string, StyleRule> = {
    ...(options.selectors ?? {}),
  };

  if (options.includeStartingStyle !== false) {
    selectors['&[data-starting-style]'] =
      options.startingStyle ?? defaultFloatingStateStyle;
  }

  if (options.includeEndingStyle !== false) {
    selectors['&[data-ending-style]'] =
      options.endingStyle ?? defaultFloatingStateStyle;
  }

  const media: Record<string, StyleRule> = {};

  if (lightOutline) {
    media['(prefers-color-scheme: light)'] = {
      outline: `1px solid ${lightOutline}`,
      boxShadow: shadow,
    };
  }

  if (darkOutline) {
    const darkShadow = options.darkShadow ?? shadow;

    media['(prefers-color-scheme: dark)'] = {
      outline: `1px solid ${darkOutline}`,
      outlineOffset: options.darkOutlineOffset ?? '-1px',
      boxShadow: darkShadow,
    };
  }

  return {
    borderRadius: options.borderRadius ?? sys.shape.corner.medium,
    backgroundColor: options.backgroundColor ?? sys.color.surface.base,
    color: options.color ?? sys.color.content.base,
    paddingBlock: options.paddingBlock,
    paddingInline: options.paddingInline,
    transformOrigin: options.transformOrigin ?? 'var(--transform-origin)',
    transition:
      options.transition === null
        ? undefined
        : (options.transition ??
          `transform ${sys.motion.duration.short[4]} ${sys.motion.easing.standard},\n    opacity ${sys.motion.duration.short[4]} ${sys.motion.easing.standard}`),
    inlineSize: options.inlineSize,
    blockSize: options.blockSize,
    minInlineSize: options.minInlineSize,
    maxInlineSize: options.maxInlineSize,
    maxBlockSize: options.maxBlockSize,
    backgroundClip: options.backgroundClip,
    overflowY: options.overflowY,
    '@media': media,
    selectors,
  };
}

export interface FloatingArrowPlacementStylesOptions {
  sideTopOffset?: string;
  sideBottomOffset?: string;
  sideLeftOffset?: string;
  sideRightOffset?: string;
}

export function createFloatingArrowPlacementStyles(
  options: FloatingArrowPlacementStylesOptions = {},
): StyleRule {
  return {
    display: 'flex',
    selectors: {
      [`&[data-side='top']`]: {
        bottom: options.sideTopOffset ?? calc.negate(sys.spacing[4]),
        rotate: '180deg',
      },
      [`&[data-side='bottom']`]: {
        top: options.sideBottomOffset ?? calc.negate(sys.spacing[4]),
        rotate: '0deg',
      },
      [`&[data-side='left']`]: {
        right: options.sideLeftOffset ?? calc.negate(sys.spacing[7]),
        rotate: '90deg',
      },
      [`&[data-side='right']`]: {
        left: options.sideRightOffset ?? calc.negate(sys.spacing[7]),
        rotate: '-90deg',
      },
    },
  };
}

export function createArrowFillStyles(
  color: string = sys.color.surface.base,
): StyleRule {
  return {
    fill: color,
  };
}

export function createArrowOuterStrokeStyles(
  color: string = sys.color.border.low,
): StyleRule {
  return {
    '@media': {
      '(prefers-color-scheme: light)': {
        fill: color,
      },
    },
  };
}

export function createArrowInnerStrokeStyles(
  color: string = floatingSurfaceDarkOutlineColor,
): StyleRule {
  return {
    '@media': {
      '(prefers-color-scheme: dark)': {
        fill: color,
      },
    },
  };
}
