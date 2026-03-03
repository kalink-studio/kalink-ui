import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';

export const switchVars = createThemeContract({
  color: {
    labelForeground: null,
    labelForegroundDisabled: null,
    trackOnStart: null,
    trackOnEnd: null,
    trackOffStart: null,
    trackOffEnd: null,
    trackBorder: null,
    trackBorderHover: null,
    trackBorderActive: null,
    trackBorderCheckedActive: null,
    trackBorderDisabled: null,
    trackStartDisabled: null,
    trackEndDisabled: null,
    trackFocusRing: null,
    thumbBackground: null,
    thumbBorder: null,
    thumbBackgroundDisabled: null,
    thumbBorderDisabled: null,
  },
  elevation: {
    thumbShadow: null,
    trackShadow: null,
    trackShadowActive: null,
    trackShadowDisabled: null,
  },
  motion: {
    thumbTransitionDuration: null,
    thumbTransitionEasing: null,
    trackTransitionDuration: null,
    trackTransitionEasing: null,
  },
  spacing: {
    labelGap: null,
    trackFocusRingOffset: null,
    trackPadding: null,
  },
  size: {
    trackInlineSize: null,
    trackBlockSize: null,
    thumbSize: null,
    thumbTranslateChecked: null,
  },
  shape: {
    trackCorner: null,
    thumbCorner: null,
  },
});

const switchDefaults = assignVars(switchVars, {
  color: {
    labelForeground: sys.color.content.base,
    labelForegroundDisabled: stateColor.disabledContent,
    trackOnStart: `color-mix(in srgb, ${sys.color.content.base} 84%, ${sys.color.tone.secondary})`,
    trackOnEnd: `color-mix(in srgb, ${sys.color.content.base} 64%, ${sys.color.tone.secondaryContainer})`,
    trackOffStart: `color-mix(in srgb, ${sys.color.content.base} 18%, ${sys.color.container.base})`,
    trackOffEnd: sys.color.container.high,
    trackBorder: sys.color.border.base,
    trackBorderHover: sys.color.border.high,
    trackBorderActive: `color-mix(in srgb, ${sys.color.content.base} 42%, ${sys.color.border.high})`,
    trackBorderCheckedActive: `color-mix(in srgb, ${sys.color.content.base} 72%, ${sys.color.tone.secondary})`,
    trackBorderDisabled: stateColor.subtleContent,
    trackStartDisabled: `color-mix(in srgb, ${sys.color.content.base} 14%, ${sys.color.container.base})`,
    trackEndDisabled: `color-mix(in srgb, ${sys.color.content.base} 8%, ${sys.color.container.high})`,
    trackFocusRing: sys.color.tone.primary,
    thumbBackground: sys.color.surface.bright,
    thumbBorder: `color-mix(in srgb, ${sys.color.content.base} 18%, transparent)`,
    thumbBackgroundDisabled: `color-mix(in srgb, ${sys.color.surface.bright} 60%, ${sys.color.container.low})`,
    thumbBorderDisabled: `color-mix(in srgb, ${sys.color.content.base} 8%, transparent)`,
  },
  elevation: {
    thumbShadow: sys.elevation.minimal,
    trackShadow: 'none',
    trackShadowActive: 'none',
    trackShadowDisabled: 'none',
  },
  motion: {
    thumbTransitionDuration: sys.motion.duration.short[4],
    thumbTransitionEasing: sys.motion.easing.standard,
    trackTransitionDuration: sys.motion.duration.short[4],
    trackTransitionEasing: sys.motion.easing.standard,
  },
  spacing: {
    labelGap: sys.spacing[4],
    trackFocusRingOffset: sys.spacing[2],
    trackPadding: '2px',
  },
  size: {
    trackInlineSize: sys.spacing[14],
    trackBlockSize: sys.spacing[10],
    thumbSize: `calc(${switchVars.size.trackBlockSize} - ${sys.spacing[3]})`,
    thumbTranslateChecked: `calc(${switchVars.size.trackInlineSize} - ${switchVars.size.thumbSize} - (${switchVars.spacing.trackPadding} * 2))`,
  },
  shape: {
    trackCorner: '999px',
    thumbCorner: sys.shape.corner.circle,
  },
});

export const label = style({
  vars: switchDefaults,

  display: 'flex',
  alignItems: 'center',
  gap: switchVars.spacing.labelGap,
  color: switchVars.color.labelForeground,
  cursor: 'pointer',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&:has([data-disabled])': {
      color: switchVars.color.labelForegroundDisabled,
      cursor: 'not-allowed',
    },
    '&:has([data-readonly]):not(:has([data-disabled]))': {
      cursor: 'default',
    },
  },
});

export const switchRoot = style({
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexShrink: 0,
  inlineSize: switchVars.size.trackInlineSize,
  blockSize: switchVars.size.trackBlockSize,
  marginBlock: '0',
  marginInline: '0',
  paddingBlock: switchVars.spacing.trackPadding,
  paddingInline: switchVars.spacing.trackPadding,
  overflow: 'hidden',
  position: 'relative',
  appearance: 'none',
  border: '0',
  backgroundColor: 'transparent',
  backgroundImage: `linear-gradient(
      105deg,
      ${switchVars.color.trackOnStart} 30%,
      ${switchVars.color.trackOnEnd} 48%,
      ${switchVars.color.trackOffStart} 60%,
      ${switchVars.color.trackOffEnd} 78%
    )`,
  backgroundSize: '250% 100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  borderRadius: switchVars.shape.trackCorner,
  outline: '1px solid',
  outlineOffset: '-1px',
  outlineColor: switchVars.color.trackBorder,
  boxShadow: switchVars.elevation.trackShadow,
  transition: transition(
    ['background-position', 'box-shadow', 'outline-color'],
    {
      duration: switchVars.motion.trackTransitionDuration,
      easing: switchVars.motion.trackTransitionEasing,
    },
  ),
  cursor: 'pointer',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  selectors: {
    '&[data-checked]': {
      backgroundPositionX: '0%',
    },
    '&[data-disabled], &[data-readonly]': {
      boxShadow: switchVars.elevation.trackShadowDisabled,
    },
    '&[data-disabled]': {
      outlineColor: switchVars.color.trackBorderDisabled,
      backgroundImage: `linear-gradient(
        105deg,
        ${switchVars.color.trackStartDisabled} 44%,
        ${switchVars.color.trackEndDisabled} 56%
      )`,
      cursor: 'not-allowed',
    },
    '&[data-readonly]:not([data-disabled])': {
      cursor: 'default',
    },
    '&:hover:not([data-disabled]):not([data-readonly])': {
      '@media': {
        '(hover: hover)': {
          outlineColor: switchVars.color.trackBorderHover,
        },
      },
    },
    '&:active:not([data-disabled]):not([data-readonly])': {
      outlineColor: switchVars.color.trackBorderActive,
      boxShadow: switchVars.elevation.trackShadowActive,
    },
    '&[data-checked]:active:not([data-disabled]):not([data-readonly])': {
      outlineColor: switchVars.color.trackBorderCheckedActive,
    },
    '&:focus-visible::before': {
      insetBlock: '-1px',
      insetInline: '-1px',
      position: 'absolute',
      borderRadius: 'inherit',
      outline: `2px solid ${switchVars.color.trackFocusRing}`,
      outlineOffset: switchVars.spacing.trackFocusRingOffset,
      content: "''",
      pointerEvents: 'none',
    },
    '&[data-disabled]:focus-visible::before': {
      content: 'none',
    },
    '&[data-checked][data-disabled]': {
      backgroundPositionX: '0%',
    },
    '&[data-unchecked][data-disabled]': {
      backgroundPositionX: '100%',
    },
  },
});

export const thumb = style({
  boxSizing: 'border-box',
  display: 'block',
  inlineSize: switchVars.size.thumbSize,
  blockSize: switchVars.size.thumbSize,
  borderRadius: switchVars.shape.thumbCorner,
  backgroundColor: switchVars.color.thumbBackground,
  border: `1px solid ${switchVars.color.thumbBorder}`,
  boxShadow: switchVars.elevation.thumbShadow,
  willChange: 'translate',
  transition: transition(
    ['translate', 'scale', 'box-shadow', 'border-color', 'background-color'],
    {
      duration: switchVars.motion.thumbTransitionDuration,
      easing: switchVars.motion.thumbTransitionEasing,
    },
  ),

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  selectors: {
    '&[data-checked]': {
      translate: `${switchVars.size.thumbTranslateChecked} 0`,
    },
    '&[data-disabled], &[data-readonly]': {
      boxShadow: 'none',
    },
    '&[data-disabled]': {
      backgroundColor: switchVars.color.thumbBackgroundDisabled,
      borderColor: switchVars.color.thumbBorderDisabled,
    },
  },
});

globalStyle(`${switchRoot}:active ${thumb}`, {
  scale: '1.16 1',
});

globalStyle(`${switchRoot}:active:not([data-checked]) ${thumb}`, {
  transformOrigin: 'left center',
});

globalStyle(`${switchRoot}:active:is([data-checked]) ${thumb}`, {
  transformOrigin: 'right center',
});
