import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';

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
    indicatorBackground: sys.color.container.low,
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
    listPaddingInline: sys.spacing[2],
    tabFocusInsetBlock: sys.spacing[2],
    tabFocusRingOffset: '-1px',
    panelFocusRingOffset: '-1px',
  },
});

export const tabs = style({
  border: `1px solid ${tabsVars.color.rootBorder}`,
  borderRadius: tabsVars.shape.rootCorner,
  vars: {
    ...tabsDefaults,
  },
});

export const list = style({
  display: 'flex',
  gap: tabsVars.spacing.listGap,
  paddingInline: tabsVars.spacing.listPaddingInline,
  position: 'relative',
  zIndex: '0',
  boxShadow: `inset 0 -1px ${tabsVars.color.rootBorder}`,
});

export const tab = style([
  {
    marginBlock: '0',
    marginInline: '0',
    borderWidth: '0',
    appearance: 'none',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',
    color: tabsVars.color.tabForeground,

    selectors: {
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
]);

export const indicator = style({
  inlineSize: 'var(--active-tab-width)',
  blockSize: 'var(--active-tab-height)',
  position: 'absolute',
  zIndex: '-1',
  insetInlineStart: '0',
  insetBlockStart: 'var(--active-tab-top)',
  borderRadius: tabsVars.shape.indicatorCorner,
  backgroundColor: tabsVars.color.indicatorBackground,
  translate: 'var(--active-tab-left) 0',
  transition: transition(['translate', 'inline-size', 'block-size'], {
    duration: tabsVars.motion.indicatorTransitionDuration,
    easing: tabsVars.motion.indicatorTransitionEasing,
  }),
});

export const panel = style({
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
});
