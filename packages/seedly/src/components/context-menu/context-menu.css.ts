import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const trigger = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: '15rem',
  blockSize: '12rem',
  border: `1px solid ${sys.color.container.top}`,
  color: sys.color.content.base,
  borderRadius: '0.375rem',
  WebkitUserSelect: 'none',
  userSelect: 'none',
});

export const positioner = style({
  outline: '0',
});

export const popup = style({
  boxSizing: 'border-box',
  paddingBlock: sys.spacing[2],
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
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
    [`&[data-ending-style]`]: {
      opacity: '0',
    },
  },
});

export const item = style({
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[8],
  paddingInlineEnd: sys.spacing[12],
  display: 'flex',
  fontSize: '0.875rem',
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
      insetInline: sys.spacing[2],
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

export const contextMenuRecipe = recipe({
  base: trigger,
});
