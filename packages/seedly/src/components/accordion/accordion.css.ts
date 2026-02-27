import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition, typography } from '../../styles';

export const accordionVars = createThemeContract({
  color: {
    itemBorder: null,
    panelForeground: null,
    rootForeground: null,
  },
  layout: {
    triggerFocusOutlineOffset: null,
  },
  motion: {
    iconTransformDuration: null,
    iconTransformEasing: null,
    panelSizeDuration: null,
    panelSizeEasing: null,
  },
  shape: {
    contentCorner: null,
  },
  size: {
    itemBorderBlockEndWidth: null,
    triggerIconSize: null,
  },
  spacing: {
    contentPaddingBlock: null,
    contentPaddingInline: null,
    triggerIconMarginInlineEnd: null,
    triggerPaddingBlock: null,
    triggerPaddingInlineEnd: null,
    triggerPaddingInlineStart: null,
  },
});

const accordionDefaults = assignVars(accordionVars, {
  color: {
    itemBorder: sys.color.border.low,
    panelForeground: stateColor.mutedContent,
    rootForeground: sys.color.content.base,
  },
  layout: {
    triggerFocusOutlineOffset: '0',
  },
  motion: {
    iconTransformDuration: sys.motion.duration.short[4],
    iconTransformEasing: sys.motion.easing.standard,
    panelSizeDuration: sys.motion.duration.short[4],
    panelSizeEasing: sys.motion.easing.standard,
  },
  shape: {
    contentCorner: sys.shape.corner.none,
  },
  size: {
    itemBorderBlockEndWidth: '1px',
    triggerIconSize: sys.spacing[6],
  },
  spacing: {
    contentPaddingBlock: sys.spacing[6],
    contentPaddingInline: sys.spacing[6],
    triggerIconMarginInlineEnd: sys.spacing[4],
    triggerPaddingBlock: sys.spacing[4],
    triggerPaddingInlineEnd: sys.spacing[2],
    triggerPaddingInlineStart: sys.spacing[6],
  },
});

export const accordion = style({
  vars: accordionDefaults,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  color: accordionVars.color.rootForeground,
});

export const item = style({
  borderBlockEnd: `${accordionVars.size.itemBorderBlockEndWidth} solid ${accordionVars.color.itemBorder}`,
});

export const header = style({
  marginBlock: '0',
  marginInline: '0',
});

export const trigger = style([
  {
    position: 'relative',

    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',

    inlineSize: '100%',
    paddingBlock: accordionVars.spacing.triggerPaddingBlock,
    paddingInlineEnd: accordionVars.spacing.triggerPaddingInlineEnd,
    paddingInlineStart: accordionVars.spacing.triggerPaddingInlineStart,

    textAlign: 'start',

    selectors: {
      '&:focus-visible': {
        zIndex: '1',

        outlineOffset: accordionVars.layout.triggerFocusOutlineOffset,
      },
    },
  },
]);

export const triggerIcon = style({
  flexShrink: '0',

  blockSize: accordionVars.size.triggerIconSize,
  inlineSize: accordionVars.size.triggerIconSize,
  marginInlineEnd: accordionVars.spacing.triggerIconMarginInlineEnd,

  transition: transition('transform', {
    duration: accordionVars.motion.iconTransformDuration,
    easing: accordionVars.motion.iconTransformEasing,
  }),

  selectors: {
    '[data-panel-open] > &': {
      transform: 'rotate(45deg) scale(1.1)',
    },
  },
});

export const panel = style([
  typography.body.large,
  {
    blockSize: 'var(--accordion-panel-height)',
    overflow: 'hidden',

    color: accordionVars.color.panelForeground,

    transition: transition('block-size', {
      duration: accordionVars.motion.panelSizeDuration,
      easing: accordionVars.motion.panelSizeEasing,
    }),

    selectors: {
      '&[data-ending-style]': {
        blockSize: '0',
      },

      '&[data-starting-style]': {
        blockSize: '0',
      },
    },
  },
]);

export const content = style({
  paddingBlock: accordionVars.spacing.contentPaddingBlock,
  paddingInline: accordionVars.spacing.contentPaddingInline,

  borderRadius: accordionVars.shape.contentCorner,
});
