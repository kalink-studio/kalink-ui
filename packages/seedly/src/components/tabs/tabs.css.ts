import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';
import { organisms } from '../../styles/layers.css';

export const tabsVars = createThemeContract({
  color: {
    rootBorder: null,
    tabForeground: null,
    tabForegroundActive: null,
    tabFocusRing: null,
    indicatorBackground: null,
  },
  motion: {
    indicatorTransitionDuration: null,
    indicatorTransitionEasing: null,
  },
  shape: {
    rootCorner: null,
    indicatorCorner: null,
    panelFocusCorner: null,
  },
  size: {
    panelBlockSize: null,
  },
  spacing: {
    listGap: null,
    listPaddingInline: null,
    tabFocusInsetBlock: null,
    tabFocusRingOffset: null,
    panelFocusRingOffset: null,
  },
});

const tabsDefaults = assignVars(tabsVars, {
  color: {
    rootBorder: sys.color.border.base,
    tabForeground: stateColor.mutedContent,
    tabForegroundActive: sys.color.content.base,
    tabFocusRing: sys.color.tone.primary,
    indicatorBackground: sys.color.content.base,
  },
  motion: {
    indicatorTransitionDuration: sys.motion.duration.medium[1],
    indicatorTransitionEasing: sys.motion.easing.standard,
  },
  shape: {
    rootCorner: sys.shape.corner.medium,
    indicatorCorner: sys.shape.corner.small,
    panelFocusCorner: sys.shape.corner.medium,
  },
  size: {
    panelBlockSize: `calc(${sys.spacing[18]} * 2)`,
  },
  spacing: {
    listGap: sys.spacing[2],
    listPaddingInline: '0',
    tabFocusInsetBlock: sys.spacing[2],
    tabFocusRingOffset: '-1px',
    panelFocusRingOffset: '-1px',
  },
});

export const tabs = style({
  '@layer': {
    [organisms]: {
      vars: {
        ...tabsDefaults,
      },
    },
  },
});

export const list = style({
  '@layer': {
    [organisms]: {
      display: 'flex',
      gap: tabsVars.spacing.listGap,
      paddingInline: tabsVars.spacing.listPaddingInline,
      position: 'relative',
      zIndex: '0',
      boxShadow: `inset 0 -1px ${tabsVars.color.rootBorder}`,
    },
  },
});

export const tab = style([
  {
    '@layer': {
      [organisms]: {
        marginBlock: '0',
        marginInline: '0',

        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        color: tabsVars.color.tabForeground,

        borderWidth: '0',
        appearance: 'none',
        backgroundColor: 'transparent',
        position: 'relative',

        selectors: {
          ['&::after']: {
            content: "''",
            position: 'absolute',
            insetInline: '0',
            insetBlockEnd: '0',
            blockSize: '2px',
            borderRadius: tabsVars.shape.indicatorCorner,
            backgroundColor: tabsVars.color.rootBorder,
            zIndex: 0,
            opacity: 0,
            transition: transition(['opacity'], {
              duration: tabsVars.motion.indicatorTransitionDuration,
              easing: tabsVars.motion.indicatorTransitionEasing,
            }),
          },
          ['&:hover:not(:disabled):not([data-disabled]):not([data-loading])']: {
            backgroundColor: 'transparent',
          },
          ['&:hover:not([data-active]):not(:disabled):not([data-disabled]):not([data-loading])::after']:
            {
              opacity: 1,
            },
          [`&[data-active]`]: {
            color: tabsVars.color.tabForegroundActive,
          },
          [`&:focus-visible`]: {
            position: 'relative',
          },
          [`&:focus-visible::before`]: {
            content: "''",
            position: 'absolute',
            insetBlock: tabsVars.spacing.tabFocusInsetBlock,
            insetInline: '0',
            borderRadius: tabsVars.shape.indicatorCorner,
            outline: `2px solid ${tabsVars.color.tabFocusRing}`,
            outlineOffset: tabsVars.spacing.tabFocusRingOffset,
          },
        },
      },
    },
  },
]);

export const indicator = style({
  '@layer': {
    [organisms]: {
      inlineSize: 'var(--active-tab-width)',
      blockSize: '2px',
      position: 'absolute',
      zIndex: '0',
      insetInlineStart: '0',
      insetBlockEnd: '0',
      borderRadius: tabsVars.shape.indicatorCorner,
      backgroundColor: tabsVars.color.indicatorBackground,
      translate: 'var(--active-tab-left) 0',
      transition: transition(['translate', 'inline-size', 'block-size'], {
        duration: tabsVars.motion.indicatorTransitionDuration,
        easing: tabsVars.motion.indicatorTransitionEasing,
      }),
    },
  },
});

export const panel = style({
  '@layer': {
    [organisms]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      blockSize: tabsVars.size.panelBlockSize,
      position: 'relative',
      outline: '0',

      selectors: {
        [`&:focus-visible`]: {
          outline: `2px solid ${tabsVars.color.tabFocusRing}`,
          outlineOffset: tabsVars.spacing.panelFocusRingOffset,
          borderRadius: tabsVars.shape.panelFocusCorner,
        },
        [`&[hidden]`]: {
          display: 'none',
        },
      },
    },
  },
});
