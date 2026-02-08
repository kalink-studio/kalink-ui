import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const positioner = style({
  blockSize: 'var(--positioner-height)',
  inlineSize: 'var(--positioner-width)',
  maxInlineSize: 'var(--available-width)',
});

export const popup = style({
  boxSizing: 'border-box',
  inlineSize: 'var(--popup-width, auto)',
  blockSize: 'var(--popup-height, auto)',
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

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
    },
  },
});

export const arrow = style({
  display: 'flex',

  selectors: {
    [`&[data-side='top']`]: {
      bottom: calc.negate(sys.spacing[4]),
      rotate: '180deg',
    },
    [`&[data-side='bottom']`]: {
      top: calc.negate(sys.spacing[4]),
      rotate: '0deg',
    },
    [`&[data-side='left']`]: {
      right: calc.negate(sys.spacing[7]),
      rotate: '90deg',
    },
    [`&[data-side='right']`]: {
      left: calc.negate(sys.spacing[7]),
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

export const popupContent = style({
  inlineSize: 'min-content',
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[4],
  paddingBlock: sys.spacing[4],
  paddingInline: sys.spacing[4],
  boxSizing: 'border-box',
});

export const image = style({
  display: 'block',
  borderRadius: '0.25rem',
  maxInlineSize: 'none',
});

export const summary = style({
  marginBlock: '0',
  marginInline: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: sys.color.content.base,
  textWrap: 'pretty',
});

export const container = style({
  display: 'flex',
  gap: sys.spacing[4],
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'baseline',
});

export const paragraph = style({
  marginBlock: '0',
  marginInline: '0',
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

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          textDecorationLine: 'underline',
        },
      },
    },
    [`&[data-popup-open]`]: {
      textDecorationLine: 'underline',
    },
    [`&:focus-visible`]: {
      borderRadius: '0.125rem',
      outline: `2px solid ${sys.color.tone.primary}`,
      textDecorationLine: 'none',
    },
  },
});

export const linkGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: sys.spacing[2],
  alignItems: 'baseline',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: sys.spacing[14],
  paddingBlock: '0',
  paddingInline: sys.spacing[7],
  marginBlock: '0',
  marginInline: '0',
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

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: sys.color.container.low,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
  },
});

export const previewCardRecipe = recipe({
  base: positioner,
});
