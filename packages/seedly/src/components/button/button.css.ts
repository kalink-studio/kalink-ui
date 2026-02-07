import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const button = style({
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
globalStyle(`${button}:hover:not([data-disabled])`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${button}:active:not([data-disabled])`, {
  backgroundColor: 'var(--color-gray-200)',
  boxShadow: 'inset 0 1px 3px var(--color-gray-200)',
  borderTopColor: 'var(--color-gray-300)',
});
globalStyle(`${button}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});
globalStyle(`${button}[data-disabled]`, {
  color: 'var(--color-gray-500)',
});

export const buttonRecipe = recipe({
  base: button,
});
