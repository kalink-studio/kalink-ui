import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

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
  backgroundColor: sys.color.surface.base,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
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
  color: sys.color.content.base,
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
  color: sys.color.content.base,
  textWrap: 'balance',
});

export const link = style({
  outline: '0',
  color: sys.color.tone.primary,
  textDecorationLine: 'none',
  textDecorationThickness: '1px',
  textDecorationColor: `color-mix(in oklab, ${sys.color.tone.primary}, transparent 40%)`,
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
  outline: `2px solid ${sys.color.tone.primary}`,
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
  border: `1px solid ${sys.color.container.high}`,
  borderRadius: '0.375rem',
  backgroundColor: sys.color.container.base,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: sys.color.content.base,
  userSelect: 'none',
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: sys.color.container.low,
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: sys.color.container.low,
});
globalStyle(`${button}:focus-visible`, {
  outline: `2px solid ${sys.color.tone.primary}`,
  outlineOffset: '-1px',
});

export const previewCardRecipe = recipe({
  base: positioner,
});
