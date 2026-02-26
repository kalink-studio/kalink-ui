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
  borderRadius?: string;
  background?: string;
  foreground?: string;
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
  outlineLight?: string | null;
  outlineDark?: string | null;
  shadow?: string;
  darkShadow?: string;
  darkOutlineOffset?: string;
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
  maxBlockSize?: string;
  overflowY?: 'auto';
  overflowX?: 'hidden';
  overscrollBehavior?: 'contain';
  paddingBlock?: string;
  scrollPaddingBlock?: string;
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
    transition: `opacity ${sys.motion.duration.short[2]} ${sys.motion.easing.standard},\n    transform ${sys.motion.duration.short[2]} ${sys.motion.easing.standard}`,
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
    paddingBlock: sys.spacing[4],
    scrollPaddingBlock: sys.spacing[4],
    outline: '0',
  },
  listboxCompact: {
    maxBlockSize: floatingPanelMaxBlockSize,
    overflowY: 'auto',
    paddingBlock: sys.spacing[2],
    scrollPaddingBlock: sys.spacing[10],
    position: 'relative',
  },
};

const floatingItemPresets: Record<
  FloatingItemPreset,
  FloatingItemStylesOptions
> = {
  listbox: {
    display: 'flex',
    minInlineSize: '0',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
  listboxWithIndicator: {
    display: 'grid',
    alignItems: 'center',
    gap: sys.spacing[4],
    gridTemplateColumns: `${sys.spacing[6]} 1fr`,
    minInlineSize: '0',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
  menu: {
    display: 'flex',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
  menuRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sys.spacing[8],
    paddingBlock: sys.spacing[4],
    paddingInline: sys.spacing[8],
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
  },
};

export function createFloatingSurfaceStyles(
  options: FloatingSurfaceStylesOptions = {},
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
      motionPreset.transition,
    inlineSize: options.popup?.inlineSize ?? options.inlineSize,
    blockSize: options.popup?.blockSize ?? options.blockSize,
    minInlineSize: options.popup?.minInlineSize ?? options.minInlineSize,
    maxInlineSize: options.popup?.maxInlineSize ?? options.maxInlineSize,
    maxBlockSize: options.popup?.maxBlockSize ?? options.maxBlockSize,
    backgroundClip: options.popup?.backgroundClip ?? options.backgroundClip,
    overflowY: options.popup?.overflowY ?? options.overflowY,
    lightOutline: options.popup?.lightOutline ?? options.outlineLight,
    darkOutline: options.popup?.darkOutline ?? options.outlineDark,
    shadow: options.popup?.shadow ?? options.shadow,
    darkShadow: options.popup?.darkShadow ?? options.darkShadow,
    darkOutlineOffset:
      options.popup?.darkOutlineOffset ?? options.darkOutlineOffset,
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
  options: FloatingAnchoredSurfaceStylesOptions = {},
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
  options: FloatingListStylesOptions = {},
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
