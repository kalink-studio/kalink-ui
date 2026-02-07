import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
  border: '1px solid var(--color-gray-200)',
  backgroundColor: 'var(--color-gray-50)',
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
  color: 'var(--color-gray-600)',
  userSelect: 'none',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  fontWeight: '500',
});
globalStyle(`${button}:focus-visible`, {
  backgroundColor: 'transparent',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: 'var(--color-gray-200)',
});
globalStyle(`${button}[data-pressed]`, {
  backgroundColor: 'var(--color-gray-100)',
  color: 'var(--color-gray-900)',
});
globalStyle(`${button}[aria-pressed]`, {
  padding: '0 0.75rem',
});
globalStyle(`${button}[role='combobox']`, {
  minWidth: '8rem',
  justifyContent: 'space-between',
  padding: '0 0.75rem',
});

export const separator = style({
  width: '1px',
  height: '16px',
  margin: '0.25rem',
  backgroundColor: 'var(--color-gray-300)',
});

export const link = style({
  color: 'var(--color-gray-500)',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  textDecoration: 'none',
  alignSelf: 'center',
  flex: '0 0 auto',
  marginInline: 'auto 0.875rem',
});
globalStyle(`${link}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-2px',
  borderRadius: 'var(--radius-sm)',
});
globalStyle(`${link}:hover`, {
  '@media': {
    '(hover: hover)': {
      color: 'var(--color-blue)',
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
  border: '1px solid var(--color-gray-200)',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  minWidth: '9rem',
});
globalStyle(`${select}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${select}[data-popup-open]`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${select}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
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
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  overflowY: 'auto',
  maxHeight: 'var(--available-height)',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow:
        '0 10px 15px -3px var(--color-gray-200),\n      0 4px 6px -4px var(--color-gray-200)',
    },
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
      outlineOffset: '-1px',
    },
  },
});
globalStyle(`${popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${popup}[data-side='none']`, {
  transition: 'none',
  transform: 'none',
  opacity: '1',
});

export const arrow = style({
  display: 'flex',
});
globalStyle(`${arrow}[data-side='top']`, {
  bottom: '-8px',
  rotate: '180deg',
});
globalStyle(`${arrow}[data-side='bottom']`, {
  top: '-8px',
  rotate: '0deg',
});
globalStyle(`${arrow}[data-side='left']`, {
  right: '-13px',
  rotate: '90deg',
});
globalStyle(`${arrow}[data-side='right']`, {
  left: '-13px',
  rotate: '-90deg',
});

export const arrowFill = style({
  fill: 'canvas',
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: 'var(--color-gray-200)',
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: 'var(--color-gray-300)',
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
});
globalStyle(`[data-side='none'] ${item}`, {
  paddingRight: '3rem',
  minWidth: 'calc(var(--anchor-width) + 1rem)',
});
globalStyle(`${item}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: 'var(--color-gray-50)',
});
globalStyle(`${item}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.25rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-900)',
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
