import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Positioner = style({
  height: 'var(--positioner-height)',
  width: 'var(--positioner-width)',
  maxWidth: 'var(--available-width)',
});

export const Popup = style({
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

export const PopupContent = style({
  width: 'min-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0.5rem',
  boxSizing: 'border-box',
});

export const Image = style({
  display: 'block',
  borderRadius: '0.25rem',
  maxWidth: 'none',
});

export const Summary = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-900)',
  textWrap: 'pretty',
});

export const Container = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'baseline',
});

export const Paragraph = style({
  margin: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  textWrap: 'balance',
});

export const Link = style({
  outline: '0',
  color: 'var(--color-blue)',
  textDecorationLine: 'none',
  textDecorationThickness: '1px',
  textDecorationColor:
    'color-mix(in oklab, var(--color-blue), transparent 40%)',
  textUnderlineOffset: '2px',
});
globalStyle(`${Link}:hover`, {
  '@media': {
    '(hover: hover)': {
      textDecorationLine: 'underline',
    },
  },
});
globalStyle(`${Link}[data-popup-open]`, {
  textDecorationLine: 'underline',
});
globalStyle(`${Link}:focus-visible`, {
  borderRadius: '0.125rem',
  outline: '2px solid var(--color-blue)',
  textDecorationLine: 'none',
});

export const LinkGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
  alignItems: 'baseline',
});

export const Button = style({
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

export const PreviewCardRecipe = recipe({
  base: Positioner,
});
