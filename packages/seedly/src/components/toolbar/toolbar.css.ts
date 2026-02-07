import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
  border: `1px solid ${sys.color.container.high}`,
  backgroundColor: sys.color.container.base,
  borderRadius: '0.375rem',
  padding: '0.125rem',
  width: '37.5rem',
});

export const group = style({
  display: 'flex',
  gap: '0.25rem',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '2rem',
  height: '2rem',
  padding: '0',
  margin: '0',
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
      padding: '0 0.75rem',
    },
    [`&[role='combobox']`]: {
      minWidth: '8rem',
      justifyContent: 'space-between',
      padding: '0 0.75rem',
    },
  },
});

export const separator = style({
  width: '1px',
  height: '16px',
  margin: '0.25rem',
  backgroundColor: sys.color.container.top,
});

export const link = style({
  color: stateColor.disabledContent,
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  textDecoration: 'none',
  alignSelf: 'center',
  flex: '0 0 auto',
  marginInline: 'auto 0.875rem',

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
  gap: '0.75rem',
  height: '2.5rem',
  paddingLeft: '0.875rem',
  paddingRight: '0.75rem',
  margin: '0',
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
  minWidth: '9rem',

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
  paddingBlock: '0.25rem',
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  overflowY: 'auto',
  maxHeight: 'var(--available-height)',
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
  paddingBlock: '0.5rem',
  paddingLeft: '0.625rem',
  paddingRight: '1rem',
  minWidth: 'var(--anchor-width)',
  display: 'grid',
  gap: '0.5rem',
  alignItems: 'center',
  gridTemplateColumns: '0.75rem 1fr',
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  scrollMarginBlock: '1rem',
  fontSize: '0.875rem',
  '@media': {
    '(pointer: coarse)': {
      paddingBlock: '0.625rem',
    },
  },

  selectors: {
    [`[data-side='none'] &`]: {
      paddingRight: '3rem',
      minWidth: 'calc(var(--anchor-width) + 1rem)',
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
      insetInline: '0.25rem',
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
  width: '0.75rem',
  height: '0.75rem',
});

export const itemText = style({
  gridColumnStart: '2',
});

export const toolbarRecipe = recipe({
  base: toolbar,
});
