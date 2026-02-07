import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const trigger = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15rem',
  height: '12rem',
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
  paddingBlock: '0.25rem',
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
});
globalStyle(`${popup}[data-ending-style]`, {
  opacity: '0',
});

export const item = style({
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: '0.5rem',
  paddingLeft: '1rem',
  paddingRight: '2rem',
  display: 'flex',
  fontSize: '0.875rem',
  lineHeight: '1rem',
});
globalStyle(`${item}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: sys.color.container.base,
});
globalStyle(`${item}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.25rem',
  borderRadius: '0.25rem',
  backgroundColor: sys.color.content.base,
});

export const separator = style({
  margin: '0.375rem 1rem',
  height: '1px',
  backgroundColor: sys.color.container.high,
});

export const contextMenuRecipe = recipe({
  base: trigger,
});
