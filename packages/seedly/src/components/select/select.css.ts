import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
});

export const Label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
  cursor: 'default',
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
  backgroundColor: 'canvas',
  fontFamily: 'inherit',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  minWidth: '10rem',
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

export const Value = style({});

export const Positioner = style({
  outline: 'none',
  zIndex: '1',
  WebkitUserSelect: 'none',
  userSelect: 'none',
});

export const Popup = style({
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
  minWidth: 'calc(var(--anchor-width) + 1rem)',
});

export const List = style({
  boxSizing: 'border-box',
  position: 'relative',
  paddingBlock: '0.25rem',
  overflowY: 'auto',
  maxHeight: 'var(--available-height)',
  scrollPaddingBlock: '1.5rem',
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
globalStyle(`[data-side='none'] ${Item}`, {
  fontSize: '1rem',
  paddingRight: '3rem',
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

export const ScrollArrow = style({
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
globalStyle(`${ScrollArrow}::before`, {
  content: "''",
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: '0',
});
globalStyle(`${ScrollArrow}[data-direction='up'][data-side='none']::before`, {
  top: '-100%',
});
globalStyle(`${ScrollArrow}[data-direction='down']`, {
  bottom: '0',
});
globalStyle(`${ScrollArrow}[data-direction='down'][data-side='none']::before`, {
  bottom: '-100%',
});

globalStyle(`${Value}[data-placeholder]`, {
  opacity: '0.6',
});

export const SelectRecipe = recipe({
  base: Field,
});
