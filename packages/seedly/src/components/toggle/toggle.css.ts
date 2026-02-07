import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const panel = style({
  display: 'flex',
  gap: '1px',
  border: '1px solid var(--color-gray-200)',
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: '0.375rem',
  padding: '0.125rem',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  padding: '0',
  margin: '0',
  outline: '0',
  border: '0',
  borderRadius: '0.25rem',
  backgroundColor: 'transparent',
  color: 'var(--color-gray-600)',
  userSelect: 'none',
});
globalStyle(`${button}:focus-visible`, {
  backgroundColor: 'transparent',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: 'var(--color-gray-200)',
});
globalStyle(`${button}[data-pressed]`, {
  color: 'var(--color-gray-900)',
});

export const icon = style({
  width: '1.25rem',
  height: '1.25rem',
});

export const toggleRecipe = recipe({
  base: panel,
});
