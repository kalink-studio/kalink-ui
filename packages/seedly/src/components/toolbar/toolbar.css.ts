import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
  border: '1px solid var(--color-gray-200)',
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: '0.375rem',
  padding: '0.125rem',
  width: '37.5rem',
});

export const Group = style({
  display: 'flex',
  gap: '0.25rem',
});

export const Button = style({
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
globalStyle(`${Button}:focus-visible`, {
  backgroundColor: 'transparent',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});
globalStyle(`${Button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Button}:active`, {
  backgroundColor: 'var(--color-gray-200)',
});
globalStyle(`${Button}[data-pressed]`, {
  backgroundColor: 'var(--color-gray-100)',
  color: 'var(--color-gray-900)',
});
globalStyle(`${Button}[aria-pressed]`, {
  padding: '0 0.75rem',
});
globalStyle(`${Button}[role='combobox']`, {
  minWidth: '8rem',
  justifyContent: 'space-between',
  padding: '0 0.75rem',
});

export const Separator = style({
  width: '1px',
  height: '16px',
  margin: '0.25rem',
  backgroundColor: 'var(--color-gray-300)',
});

export const Link = style({
  color: 'var(--color-gray-500)',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  textDecoration: 'none',
  alignSelf: 'center',
  flex: '0 0 auto',
  marginInline: 'auto 0.875rem',
});
globalStyle(`${Link}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-2px',
  borderRadius: 'var(--radius-sm)',
});
globalStyle(`${Link}:hover`, {
  '@media': {
    '(hover: hover)': {
      color: 'var(--color-blue)',
    },
  },
});

export const Select = style({
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
globalStyle(`${Select}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Select}[data-popup-open]`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${Select}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const SelectIcon = style({
  display: 'flex',
});

export const Positioner = style({
  outline: '0',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  zIndex: '1',
});

export const Popup = style({
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
globalStyle(`${Popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${Popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${Popup}[data-side='none']`, {
  transition: 'none',
  transform: 'none',
  opacity: '1',
});

export const Arrow = style({
  display: 'flex',
});
globalStyle(`${Arrow}[data-side='top']`, {
  bottom: '-8px',
  rotate: '180deg',
});
globalStyle(`${Arrow}[data-side='bottom']`, {
  top: '-8px',
  rotate: '0deg',
});
globalStyle(`${Arrow}[data-side='left']`, {
  right: '-13px',
  rotate: '90deg',
});
globalStyle(`${Arrow}[data-side='right']`, {
  left: '-13px',
  rotate: '-90deg',
});

export const ArrowFill = style({
  fill: 'canvas',
});

export const ArrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: 'var(--color-gray-200)',
    },
  },
});

export const ArrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: 'var(--color-gray-300)',
    },
  },
});

export const Item = style({
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
globalStyle(`[data-side='none'] ${Item}`, {
  paddingRight: '3rem',
  minWidth: 'calc(var(--anchor-width) + 1rem)',
});
globalStyle(`${Item}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: 'var(--color-gray-50)',
});
globalStyle(`${Item}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.25rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-900)',
});

export const ItemIndicator = style({
  gridColumnStart: '1',
});

export const ItemIndicatorIcon = style({
  display: 'block',
  width: '0.75rem',
  height: '0.75rem',
});

export const ItemText = style({
  gridColumnStart: '2',
});

export const ToolbarRecipe = recipe({
  base: Toolbar,
});
