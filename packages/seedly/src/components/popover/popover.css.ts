import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const IconButton = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  padding: '0',
  margin: '0',
  outline: '0',
  border: '1px solid var(--color-gray-200)',
  borderRadius: '0.375rem',
  backgroundColor: 'var(--color-gray-50)',
  color: 'var(--color-gray-900)',
  userSelect: 'none',
});
globalStyle(`${IconButton}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${IconButton}:active`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${IconButton}[data-popup-open]`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${IconButton}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Icon = style({
  width: '1.25rem',
  height: '1.25rem',
});

export const Positioner = style({
  width: 'var(--positioner-width)',
  height: 'var(--positioner-height)',
  maxWidth: 'var(--available-width)',
});

export const Popup = style({
  boxSizing: 'border-box',
  padding: '1rem 1.5rem',
  borderRadius: '0.5rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  width: 'var(--popup-width, auto)',
  height: 'var(--popup-height, auto)',
  maxWidth: '500px',
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

export const Title = style({
  margin: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontWeight: '500',
});

export const Description = style({
  margin: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-600)',
});

export const Container = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const Button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.375rem',
  height: '2.5rem',
  padding: '0 0.875rem',
  margin: '0',
  outline: '0',
  border: '1px solid var(--color-gray-200)',
  borderRadius: '0.375rem',
  backgroundColor: 'var(--color-gray-50)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  userSelect: 'none',
});
globalStyle(`${Button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Button}:active`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${Button}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const PopoverRecipe = recipe({
  base: IconButton,
});
