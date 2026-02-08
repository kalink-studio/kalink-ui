import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const input = style({
  boxSizing: 'border-box',
  paddingInlineStart: sys.spacing[7],
  marginBlock: '0',
  marginInline: '0',
  border: `1px solid ${sys.color.container.high}`,
  inlineSize: '16rem',
  blockSize: sys.spacing[14],
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  outline: 'none',
  '@media': {
    '(min-width: 500px)': {
      inlineSize: '20rem',
    },
  },

  selectors: {
    [`&:focus`]: {
      borderColor: sys.color.tone.primary,
      outline: `1px solid ${sys.color.tone.primary}`,
    },
  },
});

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[2],
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: sys.color.content.base,
});

export const positioner = style({
  outline: '0',
});

export const popup = style({
  boxSizing: 'border-box',
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  inlineSize: 'var(--anchor-width)',
  maxBlockSize: '23rem',
  maxInlineSize: 'var(--available-width)',
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

export const list = style({
  boxSizing: 'border-box',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  paddingBlock: sys.spacing[4],
  scrollPaddingBlock: sys.spacing[4],
  outline: '0',
  maxBlockSize: `min(${calc.multiply(sys.spacing[8], 23)}, var(--available-height))`,

  selectors: {
    [`&[data-empty]`]: {
      paddingBlock: '0',
      paddingInline: '0',
    },
  },
});

export const item = style({
  boxSizing: 'border-box',
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[8],
  paddingInlineEnd: sys.spacing[12],
  display: 'flex',
  fontSize: '1rem',
  lineHeight: '1rem',

  selectors: {
    [`&[data-highlighted]`]: {
      zIndex: '0',
      position: 'relative',
      color: sys.color.container.base,
    },
    [`&[data-highlighted]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: sys.spacing[4],
      borderRadius: '0.25rem',
      backgroundColor: sys.color.content.base,
    },
  },
});

export const separator = style({
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  blockSize: '1px',
  backgroundColor: sys.color.container.high,
});

export const empty = style({
  selectors: {
    [`&:not(:empty)`]: {
      boxSizing: 'border-box',
      paddingBlock: sys.spacing[8],
      paddingInline: sys.spacing[8],
      fontSize: '0.925rem',
      lineHeight: '1rem',
      color: stateColor.mutedContent,
    },
  },
});

export const autocompleteRecipe = recipe({
  base: input,
});
