import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const collapsible = style({
  display: 'flex',
  inlineSize: '14rem',
  minBlockSize: '9rem',
  flexDirection: 'column',
  justifyContent: 'center',
  color: sys.color.content.base,
});

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
  marginBlock: '0',
  marginInline: '0',
  border: '0',
  outline: '0',
  paddingBlock: sys.spacing[2],
  paddingInline: sys.spacing[4],
  borderRadius: '0.25rem',
  backgroundColor: sys.color.container.low,
  color: sys.color.content.base,
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.high,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: sys.color.container.high,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
    },
  },
});

export const icon = style({
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
  transition: 'transform 150ms ease-out',

  selectors: {
    [`${trigger}[data-panel-open] &`]: {
      transform: 'rotate(90deg)',
    },
  },
});

export const panel = style({
  display: 'flex',
  blockSize: 'var(--collapsible-panel-height)',
  flexDirection: 'column',
  justifyContent: 'end',
  overflow: 'hidden',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  transition: 'all 150ms ease-out',

  selectors: {
    [`&[hidden]:not([hidden='until-found'])`]: {
      display: 'none',
    },
    [`&[data-starting-style]`]: {
      blockSize: '0',
    },
    [`&[data-ending-style]`]: {
      blockSize: '0',
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[4],
  marginBlockStart: sys.spacing[2],
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[11],
  paddingInlineEnd: '0',
  borderRadius: '0.25rem',
  backgroundColor: sys.color.container.low,
  cursor: 'text',
});

export const collapsibleRecipe = recipe({
  base: collapsible,
});
