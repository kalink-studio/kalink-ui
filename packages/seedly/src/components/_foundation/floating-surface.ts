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
  borderRadius: string;
  backgroundColor: string;
  color: string;
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
  lightOutline?: string;
  darkOutline?: string;
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
  options: FloatingPopupStylesOptions,
): StyleRule {
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

  if (options.lightOutline) {
    media['(prefers-color-scheme: light)'] = {
      outline: `1px solid ${options.lightOutline}`,
      boxShadow: options.shadow,
    };
  }

  if (options.darkOutline) {
    const darkShadow = options.darkShadow ?? options.shadow;

    media['(prefers-color-scheme: dark)'] = {
      outline: `1px solid ${options.darkOutline}`,
      outlineOffset: options.darkOutlineOffset,
      boxShadow: darkShadow,
    };
  }

  return {
    borderRadius: options.borderRadius,
    backgroundColor: options.backgroundColor,
    color: options.color,
    paddingBlock: options.paddingBlock,
    paddingInline: options.paddingInline,
    transformOrigin: options.transformOrigin ?? 'var(--transform-origin)',
    transition:
      options.transition === null
        ? undefined
        : (options.transition ?? 'transform 150ms,\n    opacity 150ms'),
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
  sideTopOffset: string;
  sideBottomOffset: string;
  sideLeftOffset: string;
  sideRightOffset: string;
}

export function createFloatingArrowPlacementStyles(
  options: FloatingArrowPlacementStylesOptions,
): StyleRule {
  return {
    display: 'flex',
    selectors: {
      [`&[data-side='top']`]: {
        bottom: options.sideTopOffset,
        rotate: '180deg',
      },
      [`&[data-side='bottom']`]: {
        top: options.sideBottomOffset,
        rotate: '0deg',
      },
      [`&[data-side='left']`]: {
        right: options.sideLeftOffset,
        rotate: '90deg',
      },
      [`&[data-side='right']`]: {
        left: options.sideRightOffset,
        rotate: '-90deg',
      },
    },
  };
}

export function createArrowFillStyles(color: string): StyleRule {
  return {
    fill: color,
  };
}

export function createArrowOuterStrokeStyles(color: string): StyleRule {
  return {
    '@media': {
      '(prefers-color-scheme: light)': {
        fill: color,
      },
    },
  };
}

export function createArrowInnerStrokeStyles(color: string): StyleRule {
  return {
    '@media': {
      '(prefers-color-scheme: dark)': {
        fill: color,
      },
    },
  };
}
