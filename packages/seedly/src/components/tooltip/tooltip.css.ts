import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Panel = style({
  display: 'flex',
  border: '1px solid var(--color-gray-200)',
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: '0.375rem',
  padding: '0.125rem',
});

export const Button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  padding: '0',
  margin: '0',
  outline: '0',
  border: '0',
  borderRadius: '0.25rem',
  backgroundColor: 'transparent',
  color: 'var(--color-gray-900)',
  userSelect: 'none',
});
globalStyle(`${Button}[data-popup-open]`, {
  backgroundColor: 'var(--color-gray-100)',
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

export const Icon = style({
  width: '1rem',
  height: '1rem',
});

export const Popup = style({
  boxSizing: 'border-box',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
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
globalStyle(`${Popup}[data-instant]`, {
  transition: 'none',
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

export const TooltipRecipe = recipe({
  base: Panel,
});
