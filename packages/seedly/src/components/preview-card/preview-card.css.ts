import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const positioner = style({
  height: 'var(--positioner-height)',
  width: 'var(--positioner-width)',
  maxWidth: 'var(--available-width)',
});

export const popup = style({
  boxSizing: 'border-box',
  width: 'var(--popup-width, auto)',
  height: 'var(--popup-height, auto)',
  borderRadius: '0.5rem',
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
globalStyle(`${popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
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

export const popupContent = style({
  width: 'min-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0.5rem',
  boxSizing: 'border-box',
});

export const image = style({
  display: 'block',
  borderRadius: '0.25rem',
  maxWidth: 'none',
});

export const summary = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-900)',
  textWrap: 'pretty',
});

export const container = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'baseline',
});

export const paragraph = style({
  margin: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  textWrap: 'balance',
});

export const link = style({
  outline: '0',
  color: 'var(--color-blue)',
  textDecorationLine: 'none',
  textDecorationThickness: '1px',
  textDecorationColor:
    'color-mix(in oklab, var(--color-blue), transparent 40%)',
  textUnderlineOffset: '2px',
});
globalStyle(`${link}:hover`, {
  '@media': {
    '(hover: hover)': {
      textDecorationLine: 'underline',
    },
  },
});
globalStyle(`${link}[data-popup-open]`, {
  textDecorationLine: 'underline',
});
globalStyle(`${link}:focus-visible`, {
  borderRadius: '0.125rem',
  outline: '2px solid var(--color-blue)',
  textDecorationLine: 'none',
});

export const linkGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
  alignItems: 'baseline',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${button}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const previewCardRecipe = recipe({
  base: positioner,
});
