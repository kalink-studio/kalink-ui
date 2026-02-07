import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
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
  border: '1px solid var(--color-gray-200)',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
  fontFamily: 'inherit',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  minWidth: '10rem',
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

export const value = style({});

export const positioner = style({
  outline: 'none',
  zIndex: '1',
  WebkitUserSelect: 'none',
  userSelect: 'none',
});

export const popup = style({
  boxSizing: 'border-box',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
  backgroundClip: 'padding-box',
  color: 'var(--color-gray-900)',
  minWidth: 'var(--anchor-width)',
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow:
        '0 10px 15px -3px var(--color-gray-200),\n      0 4px 6px -4px var(--color-gray-200)',
    },
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
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
  minWidth: 'calc(var(--anchor-width) + 1rem)',
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
});
globalStyle(`[data-side='none'] ${item}`, {
  fontSize: '1rem',
  paddingRight: '3rem',
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

export const scrollArrow = style({
  width: '100%',
  background: 'canvas',
  zIndex: '1',
  textAlign: 'center',
  cursor: 'default',
  borderRadius: '0.375rem',
  height: '1rem',
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
globalStyle(`${scrollArrow}::before`, {
  content: "''",
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: '0',
});
globalStyle(`${scrollArrow}[data-direction='up'][data-side='none']::before`, {
  top: '-100%',
});
globalStyle(`${scrollArrow}[data-direction='down']`, {
  bottom: '0',
});
globalStyle(`${scrollArrow}[data-direction='down'][data-side='none']::before`, {
  bottom: '-100%',
});

globalStyle(`${value}[data-placeholder]`, {
  opacity: '0.6',
});

export const selectRecipe = recipe({
  base: field,
});
