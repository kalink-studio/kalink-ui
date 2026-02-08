import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const scrollArea = style({
  boxSizing: 'border-box',
  inlineSize: '24rem',
  blockSize: '8.5rem',
  maxInlineSize: calc.subtract('100vw', calc.multiply(sys.spacing[8], 8)),
});

export const viewport = style({
  blockSize: '100%',
  borderRadius: '0.375rem',
  outline: `1px solid ${sys.color.container.high}`,
  outlineOffset: '-1px',

  selectors: {
    [`&:focus-visible`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[8],
  paddingBlock: sys.spacing[6],
  paddingInlineStart: sys.spacing[8],
  paddingInlineEnd: sys.spacing[10],
});

export const paragraph = style({
  marginBlock: '0',
  marginInline: '0',
  fontSize: '0.875rem',
  lineHeight: '1.375rem',
  color: sys.color.content.base,
});

export const scrollbar = style({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: sys.color.container.high,
  inlineSize: sys.spacing[2],
  borderRadius: '0.375rem',
  marginBlock: sys.spacing[4],
  marginInline: sys.spacing[4],
  opacity: '0',
  transition: 'opacity 150ms',
  pointerEvents: 'none',

  selectors: {
    [`&[data-scrolling]`]: {
      transitionDuration: '0ms',
      opacity: '1',
      pointerEvents: 'auto',
    },
    [`&[data-hovering]`]: {
      opacity: '1',
      pointerEvents: 'auto',
    },
    [`&::before`]: {
      content: "''",
      position: 'absolute',
      inlineSize: sys.spacing[9],
      blockSize: '100%',
    },
  },
});

export const thumb = style({
  inlineSize: '100%',
  borderRadius: 'inherit',
  backgroundColor: stateColor.disabledContent,
});

export const scrollAreaRecipe = recipe({
  base: scrollArea,
});
