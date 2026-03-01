import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';

export const scrollAreaVars = createThemeContract({
  color: {
    scrollbarBackground: null,
    thumbBackground: null,
    viewportFocusRing: null,
    viewportOutline: null,
  },
  layout: {
    rootBlockSize: null,
  },
  motion: {
    scrollbarFadeDuration: null,
    scrollbarFadeEasing: null,
  },
  shape: {
    scrollbarCorner: null,
    viewportCorner: null,
  },
  size: {
    scrollbarHitAreaInlineSize: null,
    scrollbarInlineSize: null,
  },
  spacing: {
    contentGap: null,
    contentPaddingBlock: null,
    contentPaddingInlineEnd: null,
    contentPaddingInlineStart: null,
    scrollbarMarginBlock: null,
    scrollbarMarginInline: null,
  },
});

const scrollAreaDefaults = assignVars(scrollAreaVars, {
  color: {
    scrollbarBackground: sys.color.container.high,
    thumbBackground: stateColor.disabledContent,
    viewportFocusRing: sys.color.tone.primary,
    viewportOutline: sys.color.border.base,
  },
  layout: {
    rootBlockSize: '8.5rem',
  },
  motion: {
    scrollbarFadeDuration: sys.motion.duration.short[4],
    scrollbarFadeEasing: sys.motion.easing.standard,
  },
  shape: {
    scrollbarCorner: sys.shape.corner.medium,
    viewportCorner: sys.shape.corner.medium,
  },
  size: {
    scrollbarHitAreaInlineSize: sys.spacing[9],
    scrollbarInlineSize: sys.spacing[2],
  },
  spacing: {
    contentGap: sys.spacing[8],
    contentPaddingBlock: sys.spacing[6],
    contentPaddingInlineEnd: sys.spacing[10],
    contentPaddingInlineStart: sys.spacing[8],
    scrollbarMarginBlock: sys.spacing[4],
    scrollbarMarginInline: sys.spacing[4],
  },
});

export const scrollArea = style({
  vars: {
    ...scrollAreaDefaults,
  },

  blockSize: scrollAreaVars.layout.rootBlockSize,
  inlineSize: '100%',
});

export const viewport = style({
  blockSize: '100%',

  borderRadius: scrollAreaVars.shape.viewportCorner,
  outline: `1px solid ${scrollAreaVars.color.viewportOutline}`,
  outlineOffset: '-1px',

  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${scrollAreaVars.color.viewportFocusRing}`,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',

  gap: scrollAreaVars.spacing.contentGap,
  paddingBlock: scrollAreaVars.spacing.contentPaddingBlock,
  paddingInlineEnd: scrollAreaVars.spacing.contentPaddingInlineEnd,
  paddingInlineStart: scrollAreaVars.spacing.contentPaddingInlineStart,
});

export const scrollbar = style({
  display: 'flex',
  justifyContent: 'center',

  inlineSize: scrollAreaVars.size.scrollbarInlineSize,
  marginBlock: scrollAreaVars.spacing.scrollbarMarginBlock,
  marginInline: scrollAreaVars.spacing.scrollbarMarginInline,

  backgroundColor: scrollAreaVars.color.scrollbarBackground,
  borderRadius: scrollAreaVars.shape.scrollbarCorner,
  opacity: '0',

  transition: transition('opacity', {
    duration: scrollAreaVars.motion.scrollbarFadeDuration,
    easing: scrollAreaVars.motion.scrollbarFadeEasing,
  }),

  pointerEvents: 'none',

  selectors: {
    '&[data-hovering]': {
      opacity: '1',
      pointerEvents: 'auto',
    },

    '&[data-scrolling]': {
      opacity: '1',
      pointerEvents: 'auto',
      transition: 'none',
    },

    '&::before': {
      position: 'absolute',

      blockSize: '100%',
      inlineSize: scrollAreaVars.size.scrollbarHitAreaInlineSize,

      content: "''",
    },
  },
});

export const thumb = style({
  inlineSize: '100%',

  backgroundColor: scrollAreaVars.color.thumbBackground,
  borderRadius: 'inherit',
});
