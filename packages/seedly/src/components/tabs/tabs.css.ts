import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

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
});

const tabsColorDefaults = assignVars(tabsVars.color, {
  border: sys.color.container.high,
  tabForeground: stateColor.mutedContent,
  tabActiveForeground: sys.color.content.base,
  indicatorBackground: sys.color.container.low,
  focusRing: sys.color.tone.primary,
  icon: sys.color.container.top,
});

const tabsShapeDefaults = assignVars(tabsVars.shape, {
  rootCorner: '0.375rem',
  indicatorCorner: '0.25rem',
  focusCorner: '0.375rem',
});

export const tabs = style({
  border: `1px solid ${tabsVars.color.border}`,
  borderRadius: tabsVars.shape.rootCorner,
  vars: {
    ...tabsColorDefaults,
    ...tabsShapeDefaults,
  },
});

export const list = style({
  display: 'flex',
  position: 'relative',
  zIndex: '0',
  paddingInline: '0.25rem',
  gap: '0.25rem',
  boxShadow: `inset 0 -1px ${tabsVars.color.border}`,
});

export const tab = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '0',
  margin: '0',
  outline: '0',
  background: 'none',
  appearance: 'none',
  color: tabsVars.color.tabForeground,
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  wordBreak: 'keep-all',
  paddingInline: '0.5rem',
  paddingBlock: '0',
  height: '2rem',

  selectors: {
    [`&[data-active]`]: {
      color: tabsVars.color.tabActiveForeground,
    },
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          color: tabsVars.color.tabActiveForeground,
        },
      },
    },
    [`&:focus-visible`]: {
      position: 'relative',
    },
    [`&:focus-visible::before`]: {
      content: "''",
      position: 'absolute',
      inset: '0.25rem 0',
      borderRadius: tabsVars.shape.indicatorCorner,
      outline: `2px solid ${tabsVars.color.focusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const indicator = style({
  position: 'absolute',
  zIndex: '-1',
  left: '0',
  top: '50%',
  translate: 'var(--active-tab-left) -50%',
  width: 'var(--active-tab-width)',
  height: '1.5rem',
  borderRadius: tabsVars.shape.indicatorCorner,
  backgroundColor: tabsVars.color.indicatorBackground,
  transitionProperty: 'translate, width',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-in-out',
});

export const panel = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '8rem',
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
  width: '2.5rem',
  height: '2.5rem',
  color: tabsVars.color.icon,
});

export const tabsRecipe = recipe({
  base: tabs,
});
