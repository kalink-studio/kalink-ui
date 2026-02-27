import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';

export const tabsVars = createThemeContract({
  color: {
    border: null,
    tabForeground: null,
    tabActiveForeground: null,
    indicatorBackground: null,
    focusRing: null,
    icon: null,
  },
  shape: {
    rootCorner: null,
    indicatorCorner: null,
    focusCorner: null,
  },
  layout: {
    panelBlockSize: null,
  },
});

const tabsColorDefaults = assignVars(tabsVars.color, {
  border: sys.color.border.base,
  tabForeground: stateColor.mutedContent,
  tabActiveForeground: sys.color.content.base,
  indicatorBackground: sys.color.container.low,
  focusRing: sys.color.tone.primary,
  icon: sys.color.container.top,
});

const tabsShapeDefaults = assignVars(tabsVars.shape, {
  rootCorner: sys.shape.corner.medium,
  indicatorCorner: sys.shape.corner.small,
  focusCorner: sys.shape.corner.medium,
});

const tabsLayoutDefaults = assignVars(tabsVars.layout, {
  panelBlockSize: '8rem',
});

export const tabs = style({
  border: `1px solid ${tabsVars.color.border}`,
  borderRadius: tabsVars.shape.rootCorner,
  vars: {
    ...tabsColorDefaults,
    ...tabsShapeDefaults,
    ...tabsLayoutDefaults,
  },
});

export const list = style({
  display: 'flex',
  gap: sys.spacing[2],
  paddingInline: sys.spacing[2],
  position: 'relative',
  zIndex: '0',
  boxShadow: `inset 0 -1px ${tabsVars.color.border}`,
});

export const tab = style([
  {
    marginBlock: '0',
    marginInline: '0',
    borderWidth: '0',
    appearance: 'none',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',

    selectors: {
      [`&[data-active]`]: {
        color: tabsVars.color.tabActiveForeground,
      },
      [`&:focus-visible`]: {
        position: 'relative',
      },
      [`&:focus-visible::before`]: {
        content: "''",
        position: 'absolute',
        insetBlock: sys.spacing[2],
        insetInline: '0',
        borderRadius: tabsVars.shape.indicatorCorner,
        outline: `2px solid ${tabsVars.color.focusRing}`,
        outlineOffset: '-1px',
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
    duration: 'medium.1',
    easing: 'standard',
  }),
});

export const panel = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: tabsVars.layout.panelBlockSize,
  position: 'relative',
  outline: '0',

  selectors: {
    [`&:focus-visible`]: {
      outline: `2px solid ${tabsVars.color.focusRing}`,
      outlineOffset: '-1px',
      borderRadius: tabsVars.shape.focusCorner,
    },
    [`&[hidden]`]: {
      display: 'none',
    },
  },
});

export const icon = style({
  inlineSize: sys.spacing[14],
  blockSize: sys.spacing[14],
  color: tabsVars.color.icon,
});
