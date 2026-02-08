import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
  border: `1px solid ${sys.color.container.high}`,
  backgroundColor: sys.color.container.base,
  borderRadius: '0.375rem',
  paddingBlock: sys.spacing[1],
  paddingInline: sys.spacing[1],
  inlineSize: '37.5rem',
});

export const group = style({
  display: 'flex',
  gap: sys.spacing[2],
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minInlineSize: sys.spacing[12],
  blockSize: sys.spacing[12],
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  border: '0',
  borderRadius: '0.25rem',
  backgroundColor: 'transparent',
  color: stateColor.mutedContent,
  userSelect: 'none',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  fontWeight: '500',

  selectors: {
    [`&:focus-visible`]: {
      backgroundColor: 'transparent',
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: sys.color.container.high,
    },
    [`&[data-pressed]`]: {
      backgroundColor: sys.color.container.low,
      color: sys.color.content.base,
    },
    [`&[aria-pressed]`]: {
      paddingBlock: '0',
      paddingInline: sys.spacing[6],
    },
    [`&[role='combobox']`]: {
      minInlineSize: '8rem',
      justifyContent: 'space-between',
      paddingBlock: '0',
      paddingInline: sys.spacing[6],
    },
  },
});

export const separator = style({
  inlineSize: '1px',
  blockSize: sys.spacing[8],
  marginBlock: sys.spacing[2],
  marginInline: sys.spacing[2],
  backgroundColor: sys.color.container.top,
});

export const link = style({
  color: stateColor.disabledContent,
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  textDecoration: 'none',
  alignSelf: 'center',
  flex: '0 0 auto',
  marginInline: `auto ${sys.spacing[7]}`,

  selectors: {
    [`&:focus-visible`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-2px',
      borderRadius: 'var(--radius-sm)',
    },
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          color: sys.color.tone.primary,
        },
      },
    },
  },
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
  border: `1px solid ${sys.color.container.high}`,
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: sys.color.content.base,
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  minInlineSize: '9rem',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&[data-popup-open]`]: {
      backgroundColor: sys.color.container.low,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
  },
});

export const selectIcon = style({
  display: 'flex',
});

export const positioner = style({
  outline: '0',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  zIndex: '1',
});

export const popup = style({
  boxSizing: 'border-box',
  paddingBlock: sys.spacing[2],
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  overflowY: 'auto',
  maxBlockSize: 'var(--available-height)',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${sys.color.container.high}`,
      boxShadow: sys.elevation.moderate,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${sys.color.container.top}`,
      outlineOffset: '-1px',
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
    },
  },
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
  fill: sys.color.surface.base,
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: sys.color.container.high,
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: sys.color.container.top,
    },
  },
});

export const item = style({
  boxSizing: 'border-box',
  outline: '0',
  lineHeight: '1rem',
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[5],
  paddingInlineEnd: sys.spacing[8],
  minInlineSize: 'var(--anchor-width)',
  display: 'grid',
  gap: sys.spacing[4],
  alignItems: 'center',
  gridTemplateColumns: `${sys.spacing[6]} 1fr`,
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  scrollMarginBlock: sys.spacing[8],
  fontSize: '0.875rem',
  '@media': {
    '(pointer: coarse)': {
      paddingBlock: sys.spacing[5],
    },
  },

  selectors: {
    [`[data-side='none'] &`]: {
      paddingInlineEnd: sys.spacing[15],
      minInlineSize: calc.add('var(--anchor-width)', sys.spacing[8]),
    },
    [`&[data-highlighted]`]: {
      zIndex: '0',
      position: 'relative',
      color: sys.color.container.base,
    },
    [`&[data-highlighted]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: sys.spacing[2],
      borderRadius: '0.25rem',
      backgroundColor: sys.color.content.base,
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

export const toolbarRecipe = recipe({
  base: toolbar,
});
