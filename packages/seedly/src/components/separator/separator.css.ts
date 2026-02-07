import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  gap: '1rem',
  textWrap: 'nowrap',
});

export const separator = style({
  width: '1px',
  backgroundColor: 'var(--color-gray-300)',
});

export const link = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-900)',
  textDecorationColor: 'var(--color-gray-400)',
  textDecorationThickness: '1px',
  textDecorationLine: 'none',
  textUnderlineOffset: '2px',
});
globalStyle(`${link}:hover`, {
  '@media': {
    '(hover: hover)': {
      textDecorationLine: 'underline',
    },
  },
});
globalStyle(`${link}:focus-visible`, {
  borderRadius: '0.125rem',
  outline: '2px solid var(--color-blue)',
  textDecorationLine: 'none',
});

export const separatorRecipe = recipe({
  base: container,
});
