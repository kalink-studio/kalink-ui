import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
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
  gap: sys.spacing[2],
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
  gap: sys.spacing[6],
  blockSize: sys.spacing[14],
  paddingInlineStart: sys.spacing[7],
  paddingInlineEnd: sys.spacing[6],
  marginBlock: '0',
  marginInline: '0',
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
  minInlineSize: '10rem',

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
  minInlineSize: 'var(--anchor-width)',
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
      minInlineSize: calc.add('var(--anchor-width)', sys.spacing[8]),
    },
  },
});

export const list = style({
  boxSizing: 'border-box',
  position: 'relative',
  paddingBlock: sys.spacing[2],
  overflowY: 'auto',
  maxBlockSize: 'var(--available-height)',
  scrollPaddingBlock: sys.spacing[10],
});

export const arrow = style({
  display: 'flex',

  selectors: {
    [`&[data-side='top']`]: {
      bottom: calc.negate(sys.spacing[4]),
      rotate: '180deg',
    },
    [`&[data-side='bottom']`]: {
      top: calc.negate(sys.spacing[4]),
      rotate: '0deg',
    },
    [`&[data-side='left']`]: {
      right: calc.negate(sys.spacing[7]),
      rotate: '90deg',
    },
    [`&[data-side='right']`]: {
      left: calc.negate(sys.spacing[7]),
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
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[5],
  paddingInlineEnd: sys.spacing[8],
  display: 'grid',
  gap: sys.spacing[4],
  alignItems: 'center',
  gridTemplateColumns: `${sys.spacing[6]} 1fr`,
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  '@media': {
    '(pointer: coarse)': {
      paddingBlock: sys.spacing[5],
      fontSize: '0.925rem',
    },
  },

  selectors: {
    [`[data-side='none'] &`]: {
      fontSize: '1rem',
      paddingInlineEnd: sys.spacing[15],
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
      insetInline: sys.spacing[2],
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
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
});

export const itemText = style({
  gridColumnStart: '2',
});

export const scrollArrow = style({
  inlineSize: '100%',
  background: selectVars.color.scrollArrowBackground,
  zIndex: '1',
  textAlign: 'center',
  cursor: 'default',
  borderRadius: selectVars.shape.scrollArrowCorner,
  blockSize: sys.spacing[8],
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    [`&::before`]: {
      content: "''",
      position: 'absolute',
      inlineSize: '100%',
      blockSize: '100%',
      insetInlineStart: '0',
    },
    [`&[data-direction='up'][data-side='none']::before`]: {
      insetBlockStart: '-100%',
    },
    [`&[data-direction='down']`]: {
      insetBlockEnd: '0',
    },
    [`&[data-direction='down'][data-side='none']::before`]: {
      insetBlockEnd: '-100%',
    },
  },
});

export const selectRecipe = recipe({
  base: field,
});
