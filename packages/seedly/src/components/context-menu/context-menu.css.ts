import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Trigger = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15rem',
  height: '12rem',
  border: '1px solid var(--color-gray-300)',
  color: 'var(--color-gray-900)',
  borderRadius: '0.375rem',
  WebkitUserSelect: 'none',
  userSelect: 'none',
});

export const Positioner = style({
  outline: '0',
});

export const Popup = style({
  boxSizing: 'border-box',
  paddingBlock: '0.25rem',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
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
globalStyle(`${Popup}[data-ending-style]`, {
  opacity: '0',
});

export const Item = style({
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
globalStyle(`${Item}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: 'var(--color-gray-50)',
});
globalStyle(`${Item}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.25rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-900)',
});

export const Separator = style({
  margin: '0.375rem 1rem',
  height: '1px',
  backgroundColor: 'var(--color-gray-200)',
});

export const ContextMenuRecipe = recipe({
  base: Trigger,
});
