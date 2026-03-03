import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition } from '../../styles';
import { components } from '../../styles/layers.css';

export const collapsibleVars = createThemeContract({
  color: {
    contentBackground: null,
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
    triggerCorner: null,
  },
  size: {
    iconSize: null,
    rootMinBlockSize: null,
  },
  spacing: {
    contentGap: null,
    contentMarginBlockStart: null,
    contentPaddingBlock: null,
    contentPaddingInlineEnd: null,
    contentPaddingInlineStart: null,
    triggerPaddingBlock: null,
    triggerPaddingInline: null,
  },
});

const collapsibleDefaults = assignVars(collapsibleVars, {
  color: {
    contentBackground: sys.color.container.low,
    rootForeground: sys.color.content.base,
  },
  layout: {
    triggerFocusOutlineOffset: sys.spacing[0],
  },
  motion: {
    iconTransformDuration: sys.motion.duration.short[4],
    iconTransformEasing: sys.motion.easing.standard,
    panelSizeDuration: sys.motion.duration.short[4],
    panelSizeEasing: sys.motion.easing.standard,
  },
  shape: {
    contentCorner: sys.shape.corner.small,
    triggerCorner: sys.shape.corner.small,
  },
  size: {
    iconSize: sys.spacing[6],
    rootMinBlockSize: `initial`,
  },
  spacing: {
    contentGap: sys.spacing[4],
    contentMarginBlockStart: sys.spacing[2],
    contentPaddingBlock: sys.spacing[4],
    contentPaddingInlineEnd: sys.spacing[0],
    contentPaddingInlineStart: sys.spacing[11],
    triggerPaddingBlock: sys.spacing[2],
    triggerPaddingInline: sys.spacing[4],
  },
});

export const collapsible = style({
  '@layer': {
    [components]: {
      vars: collapsibleDefaults,

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      minBlockSize: collapsibleVars.size.rootMinBlockSize,

      color: collapsibleVars.color.rootForeground,
    },
  },
});

export const trigger = style({
  '@layer': {
    [components]: {
      paddingBlock: collapsibleVars.spacing.triggerPaddingBlock,
      paddingInline: collapsibleVars.spacing.triggerPaddingInline,

      borderRadius: collapsibleVars.shape.triggerCorner,

      selectors: {
        '&:focus-visible': {
          outlineOffset: collapsibleVars.layout.triggerFocusOutlineOffset,
        },
      },
    },
  },
});

export const icon = style({
  '@layer': {
    [components]: {
      blockSize: collapsibleVars.size.iconSize,
      inlineSize: collapsibleVars.size.iconSize,

      transition: transition('transform', {
        duration: collapsibleVars.motion.iconTransformDuration,
        easing: collapsibleVars.motion.iconTransformEasing,
      }),

      selectors: {
        [`${trigger}[data-panel-open] &`]: {
          transform: 'rotate(90deg)',
        },
      },
    },
  },
});

export const panel = style({
  '@layer': {
    [components]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',

      blockSize: 'var(--collapsible-panel-height)',
      overflow: 'hidden',

      transition: transition('block-size', {
        duration: collapsibleVars.motion.panelSizeDuration,
        easing: collapsibleVars.motion.panelSizeEasing,
      }),

      selectors: {
        "&[hidden]:not([hidden='until-found'])": {
          display: 'none',
        },

        '&[data-starting-style]': {
          blockSize: '0',
        },

        '&[data-ending-style]': {
          blockSize: '0',
        },
      },
    },
  },
});

export const content = style({
  '@layer': {
    [components]: {
      display: 'flex',
      flexDirection: 'column',

      gap: collapsibleVars.spacing.contentGap,
      marginBlockStart: collapsibleVars.spacing.contentMarginBlockStart,
      paddingBlock: collapsibleVars.spacing.contentPaddingBlock,
      paddingInlineEnd: collapsibleVars.spacing.contentPaddingInlineEnd,
      paddingInlineStart: collapsibleVars.spacing.contentPaddingInlineStart,

      backgroundColor: collapsibleVars.color.contentBackground,
      borderRadius: collapsibleVars.shape.contentCorner,

      cursor: 'text',
    },
  },
});
