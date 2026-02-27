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
  outline: string | null;
  outlineInverse?: string | null;
  shadow: string;
  darkShadow?: string;
  outlineInverseOffset?: string;
  selectors?: Record<string, StyleRule>;
  includeStartingStyle?: boolean;
  includeEndingStyle?: boolean;
  startingStyle?: StyleRule;
  endingStyle?: StyleRule;
}

export type FloatingMotionPreset = 'scale' | 'scaleSoft' | 'fadeOut' | 'none';

export interface FloatingSurfaceMotionOptions {
  preset?: FloatingMotionPreset;
  transition?: string | null;
  includeStartingStyle?: boolean;
  includeEndingStyle?: boolean;
  startingStyle?: StyleRule;
  endingStyle?: StyleRule;
}

export interface FloatingSurfaceStylesOptions {
  borderRadius: string;
  background: string;
  foreground: string;
  paddingBlock?: string;
  paddingInline?: string;
  transformOrigin?: string;
  inlineSize?: string;
  blockSize?: string;
  minInlineSize?: string;
  maxInlineSize?: string;
  maxBlockSize?: string;
  backgroundClip?: 'padding-box';
  overflowY?: 'auto';
  outline: string | null;
  outlineInverse?: string | null;
  shadow: string;
  transition?: string | null;
  darkShadow?: string;
  outlineInverseOffset?: string;
  selectors?: Record<string, StyleRule>;
  motion?: FloatingSurfaceMotionOptions;
  popup?: Partial<FloatingPopupStylesOptions>;
}

export interface FloatingAnchoredSurfaceStylesOptions extends FloatingSurfaceStylesOptions {
  anchorWidth?: 'inline' | 'min-inline' | false;
  useAvailableWidth?: boolean;
}

export type FloatingListPreset = 'listbox' | 'listboxCompact';

export interface FloatingListStylesOptions {
  preset?: FloatingListPreset;
  maxBlockSize: string;
  overflowY?: 'auto';
  overflowX?: 'hidden';
  overscrollBehavior?: 'contain';
  paddingBlock: string;
  scrollPaddingBlock: string;
  outline?: string;
  position?: 'relative';
  selectors?: Record<string, StyleRule>;
  media?: Record<string, StyleRule>;
  styles?: StyleRule;
}

export type FloatingItemPreset =
  | 'listbox'
  | 'listboxWithIndicator'
  | 'menu'
  | 'menuRow';

export interface FloatingItemStylesOptions {
  preset?: FloatingItemPreset;
  display?: 'flex' | 'grid';
  alignItems?: 'center';
  justifyContent?: 'space-between';
  gap?: string;
  gridTemplateColumns?: string;
  minInlineSize?: string;
  paddingBlock?: string;
  paddingInline?: string;
  paddingInlineStart?: string;
  paddingInlineEnd?: string;
  outline?: string;
  cursor?: 'default';
  webkitUserSelect?: 'none';
  userSelect?: 'none';
  overflowWrap?: 'anywhere';
  selectors?: Record<string, StyleRule>;
  media?: Record<string, StyleRule>;
  styles?: StyleRule;
}

const defaultFloatingStateStyle = {
  opacity: '0',
  transform: 'scale(0.9)',
} as const;

const softFloatingStateStyle = {
  opacity: '0',
  transform: 'scale(0.95)',
} as const;

const floatingMotionPresets: Record<
  FloatingMotionPreset,
  FloatingSurfaceMotionOptions
> = {
  scale: {},
  scaleSoft: {
    startingStyle: softFloatingStateStyle,
    endingStyle: softFloatingStateStyle,
  },
  fadeOut: {
    includeStartingStyle: false,
    endingStyle: {
      opacity: '0',
    },
  },
  none: {
    transition: null,
    includeStartingStyle: false,
    includeEndingStyle: false,
  },
};

const floatingListPresets: Record<
  FloatingListPreset,
  FloatingListStylesOptions
> = {
  listbox: {
    maxBlockSize: floatingPanelMaxBlockSize,
    overflowY: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'contain',
    paddingBlock: '0',
    scrollPaddingBlock: '0',
    outline: '0',
  },
  listboxCompact: {
    maxBlockSize: floatingPanelMaxBlockSize,
    overflowY: 'auto',
    paddingBlock: '0',
    scrollPaddingBlock: '0',
    position: 'relative',
  },
};

const floatingItemPresets: Record<
  FloatingItemPreset,
  FloatingItemStylesOptions
> = {
  listbox: {
    display: 'flex',
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
  listboxWithIndicator: {
    display: 'grid',
    alignItems: 'center',
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
  menu: {
    display: 'flex',
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
  menuRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
};

export function createFloatingSurfaceStyles(
  options: FloatingSurfaceStylesOptions,
): StyleRule {
  const motionPreset = floatingMotionPresets[options.motion?.preset ?? 'scale'];
  const mergedSelectors = {
    ...(options.selectors ?? {}),
    ...(options.popup?.selectors ?? {}),
  };

  return createFloatingPopupStyles({
    borderRadius: options.popup?.borderRadius ?? options.borderRadius,
    backgroundColor: options.popup?.backgroundColor ?? options.background,
    color: options.popup?.color ?? options.foreground,
    paddingBlock: options.popup?.paddingBlock ?? options.paddingBlock,
    paddingInline: options.popup?.paddingInline ?? options.paddingInline,
    transformOrigin: options.popup?.transformOrigin ?? options.transformOrigin,
    transition:
      options.popup?.transition ??
      options.motion?.transition ??
      options.transition,
    inlineSize: options.popup?.inlineSize ?? options.inlineSize,
    blockSize: options.popup?.blockSize ?? options.blockSize,
    minInlineSize: options.popup?.minInlineSize ?? options.minInlineSize,
    maxInlineSize: options.popup?.maxInlineSize ?? options.maxInlineSize,
    maxBlockSize: options.popup?.maxBlockSize ?? options.maxBlockSize,
    backgroundClip: options.popup?.backgroundClip ?? options.backgroundClip,
    overflowY: options.popup?.overflowY ?? options.overflowY,
    outline: options.popup?.outline ?? options.outline,
    outlineInverse: options.popup?.outlineInverse ?? options.outlineInverse,
    shadow: options.popup?.shadow ?? options.shadow,
    darkShadow: options.popup?.darkShadow ?? options.darkShadow,
    outlineInverseOffset:
      options.popup?.outlineInverseOffset ?? options.outlineInverseOffset,
    selectors: mergedSelectors,
    includeStartingStyle:
      options.popup?.includeStartingStyle ??
      options.motion?.includeStartingStyle ??
      motionPreset.includeStartingStyle,
    includeEndingStyle:
      options.popup?.includeEndingStyle ??
      options.motion?.includeEndingStyle ??
      motionPreset.includeEndingStyle,
    startingStyle:
      options.popup?.startingStyle ??
      options.motion?.startingStyle ??
      motionPreset.startingStyle,
    endingStyle:
      options.popup?.endingStyle ??
      options.motion?.endingStyle ??
      motionPreset.endingStyle,
  });
}

export function createFloatingAnchoredSurfaceStyles(
  options: FloatingAnchoredSurfaceStylesOptions,
): StyleRule {
  const anchorWidth = options.anchorWidth ?? 'inline';
  const useAvailableWidth = options.useAvailableWidth ?? true;

  return createFloatingSurfaceStyles({
    ...options,
    inlineSize:
      anchorWidth === 'inline'
        ? (options.inlineSize ?? 'var(--anchor-width)')
        : options.inlineSize,
    minInlineSize:
      anchorWidth === 'min-inline'
        ? (options.minInlineSize ?? 'var(--anchor-width)')
        : options.minInlineSize,
    maxInlineSize: useAvailableWidth
      ? (options.maxInlineSize ?? 'var(--available-width)')
      : options.maxInlineSize,
  });
}

export function createFloatingListStyles(
  options: FloatingListStylesOptions,
): StyleRule {
  const preset = floatingListPresets[options.preset ?? 'listbox'];
  const styles = options.styles ?? {};
  const styleSelectors = (styles.selectors ?? {}) as Record<string, StyleRule>;
  const styleMedia = (styles['@media'] ?? {}) as Record<string, StyleRule>;

  return {
    ...styles,
    maxBlockSize: options.maxBlockSize ?? preset.maxBlockSize,
    overflowY: options.overflowY ?? preset.overflowY,
    overflowX: options.overflowX ?? preset.overflowX,
    overscrollBehavior: options.overscrollBehavior ?? preset.overscrollBehavior,
    paddingBlock: options.paddingBlock ?? preset.paddingBlock,
    scrollPaddingBlock: options.scrollPaddingBlock ?? preset.scrollPaddingBlock,
    outline: options.outline ?? preset.outline,
    position: options.position ?? preset.position,
    selectors: {
      ...styleSelectors,
      ...(options.selectors ?? {}),
    },
    '@media': {
      ...styleMedia,
      ...(options.media ?? {}),
    },
  };
}

export function createFloatingItemStyles(
  options: FloatingItemStylesOptions = {},
): StyleRule {
  const preset = floatingItemPresets[options.preset ?? 'listbox'];
  const styles = options.styles ?? {};
  const styleSelectors = (styles.selectors ?? {}) as Record<string, StyleRule>;
  const styleMedia = (styles['@media'] ?? {}) as Record<string, StyleRule>;

  return {
    ...styles,
    display: options.display ?? preset.display,
    alignItems: options.alignItems ?? preset.alignItems,
    justifyContent: options.justifyContent ?? preset.justifyContent,
    gap: options.gap ?? preset.gap,
    gridTemplateColumns:
      options.gridTemplateColumns ?? preset.gridTemplateColumns,
    minInlineSize: options.minInlineSize ?? preset.minInlineSize,
    paddingBlock: options.paddingBlock ?? preset.paddingBlock,
    paddingInline: options.paddingInline ?? preset.paddingInline,
    paddingInlineStart: options.paddingInlineStart ?? preset.paddingInlineStart,
    paddingInlineEnd: options.paddingInlineEnd ?? preset.paddingInlineEnd,
    outline: options.outline ?? preset.outline,
    cursor: options.cursor ?? preset.cursor,
    WebkitUserSelect: options.webkitUserSelect ?? preset.webkitUserSelect,
    userSelect: options.userSelect ?? preset.userSelect,
    overflowWrap: options.overflowWrap ?? preset.overflowWrap,
    selectors: {
      ...styleSelectors,
      ...(options.selectors ?? {}),
    },
    '@media': {
      ...styleMedia,
      ...(options.media ?? {}),
    },
  };
}

export function createFloatingPopupStyles(
  options: FloatingPopupStylesOptions,
): StyleRule {
  const outline = options.outline;
  const outlineInverse = options.outlineInverse;

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

  if (outlineInverse || options.darkShadow || options.outlineInverseOffset) {
    media['(prefers-color-scheme: dark)'] = {
      outline: outlineInverse ? `1px solid ${outlineInverse}` : undefined,
      outlineOffset: options.outlineInverseOffset,
      boxShadow: options.darkShadow,
    };
  }

  return {
    borderRadius: options.borderRadius,
    backgroundColor: options.backgroundColor,
    color: options.color,
    outline: outline ? `1px solid ${outline}` : undefined,
    boxShadow: options.shadow,
    paddingBlock: options.paddingBlock,
    paddingInline: options.paddingInline,
    transformOrigin: options.transformOrigin ?? 'var(--transform-origin)',
    transition: options.transition === null ? undefined : options.transition,
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
