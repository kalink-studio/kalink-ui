import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const selectVars = createThemeContract({
  color: {
    foreground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerHoverBackground: null,
    focusRing: null,
    popupBackground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    popupShadow: null,
    itemHighlightedForeground: null,
    itemHighlightedBackground: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
    scrollArrowBackground: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
    itemCorner: null,
    scrollArrowCorner: null,
  },
});

const selectColorDefaults = assignVars(selectVars.color, {
  foreground: sys.color.content.base,
  triggerBackground: sys.color.surface.base,
  triggerBorder: sys.color.container.high,
  triggerHoverBackground: sys.color.container.low,
  focusRing: sys.color.tone.primary,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.container.high,
  popupOutlineDark: sys.color.container.top,
  popupShadow: sys.elevation.moderate,
  itemHighlightedForeground: sys.color.container.base,
  itemHighlightedBackground: sys.color.content.base,
  arrowOuterStroke: sys.color.container.high,
  arrowInnerStroke: sys.color.container.top,
  scrollArrowBackground: sys.color.surface.base,
});

const selectShapeDefaults = assignVars(selectVars.shape, {
  triggerCorner: '0.375rem',
  popupCorner: '0.375rem',
  itemCorner: '0.25rem',
  scrollArrowCorner: '0.375rem',
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
  vars: {
    ...selectColorDefaults,
    ...selectShapeDefaults,
  },
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: selectVars.color.foreground,
  cursor: 'default',
});

export const select = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  height: '2.5rem',
  paddingLeft: '0.875rem',
  paddingRight: '0.75rem',
  margin: '0',
  outline: '0',
  border: `1px solid ${selectVars.color.triggerBorder}`,
  borderRadius: selectVars.shape.triggerCorner,
  backgroundColor: selectVars.color.triggerBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: selectVars.color.foreground,
  WebkitUserSelect: 'none',
  userSelect: 'none',
  minWidth: '10rem',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: selectVars.color.triggerHoverBackground,
        },
      },
    },
    [`&[data-popup-open]`]: {
      backgroundColor: selectVars.color.triggerHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${selectVars.color.focusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const selectIcon = style({
  display: 'flex',
});

export const value = style({
  selectors: {
    [`&[data-placeholder]`]: {
      opacity: '0.6',
    },
  },
});

export const positioner = style({
  outline: 'none',
  zIndex: '1',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  vars: {
    ...selectColorDefaults,
    ...selectShapeDefaults,
  },
});

export const popup = style({
  boxSizing: 'border-box',
  borderRadius: selectVars.shape.popupCorner,
  backgroundColor: selectVars.color.popupBackground,
  backgroundClip: 'padding-box',
  color: selectVars.color.foreground,
  minWidth: 'var(--anchor-width)',
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${selectVars.color.popupOutlineLight}`,
      boxShadow: selectVars.color.popupShadow,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${selectVars.color.popupOutlineDark}`,
    },
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
    },
    [`&[data-side='none']`]: {
      transition: 'none',
      transform: 'none',
      opacity: '1',
      minWidth: 'calc(var(--anchor-width) + 1rem)',
    },
  },
});

export const list = style({
  boxSizing: 'border-box',
  position: 'relative',
  paddingBlock: '0.25rem',
  overflowY: 'auto',
  maxHeight: 'var(--available-height)',
  scrollPaddingBlock: '1.5rem',
});

export const arrow = style({
  display: 'flex',

  selectors: {
    [`&[data-side='top']`]: {
      bottom: '-8px',
      rotate: '180deg',
    },
    [`&[data-side='bottom']`]: {
      top: '-8px',
      rotate: '0deg',
    },
    [`&[data-side='left']`]: {
      right: '-13px',
      rotate: '90deg',
    },
    [`&[data-side='right']`]: {
      left: '-13px',
      rotate: '-90deg',
    },
  },
});

export const arrowFill = style({
  fill: selectVars.color.popupBackground,
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: selectVars.color.arrowOuterStroke,
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: selectVars.color.arrowInnerStroke,
    },
  },
});

export const item = style({
  boxSizing: 'border-box',
  outline: '0',
  fontSize: '0.875rem',
  lineHeight: '1rem',
  paddingBlock: '0.5rem',
  paddingLeft: '0.625rem',
  paddingRight: '1rem',
  display: 'grid',
  gap: '0.5rem',
  alignItems: 'center',
  gridTemplateColumns: '0.75rem 1fr',
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  '@media': {
    '(pointer: coarse)': {
      paddingBlock: '0.625rem',
      fontSize: '0.925rem',
    },
  },

  selectors: {
    [`[data-side='none'] &`]: {
      fontSize: '1rem',
      paddingRight: '3rem',
    },
    [`&[data-highlighted]`]: {
      zIndex: '0',
      position: 'relative',
      color: selectVars.color.itemHighlightedForeground,
    },
    [`&[data-highlighted]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: '0.25rem',
      borderRadius: selectVars.shape.itemCorner,
      backgroundColor: selectVars.color.itemHighlightedBackground,
    },
  },
});

export const itemIndicator = style({
  gridColumnStart: '1',
});

export const itemIndicatorIcon = style({
  display: 'block',
  width: '0.75rem',
  height: '0.75rem',
});

export const itemText = style({
  gridColumnStart: '2',
});

export const scrollArrow = style({
  width: '100%',
  background: selectVars.color.scrollArrowBackground,
  zIndex: '1',
  textAlign: 'center',
  cursor: 'default',
  borderRadius: selectVars.shape.scrollArrowCorner,
  height: '1rem',
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    [`&::before`]: {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: '0',
    },
    [`&[data-direction='up'][data-side='none']::before`]: {
      top: '-100%',
    },
    [`&[data-direction='down']`]: {
      bottom: '0',
    },
    [`&[data-direction='down'][data-side='none']::before`]: {
      bottom: '-100%',
    },
  },
});

export const selectRecipe = recipe({
  base: field,
});
