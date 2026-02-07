import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Container = style({
  display: 'flex',
  gap: '1rem',
  textWrap: 'nowrap',
});

export const Separator = style({
  width: '1px',
  backgroundColor: 'var(--color-gray-300)',
});

export const Link = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-900)',
  textDecorationColor: 'var(--color-gray-400)',
  textDecorationThickness: '1px',
  textDecorationLine: 'none',
  textUnderlineOffset: '2px',
});
globalStyle(`${Link}:hover`, {
  '@media': {
    '(hover: hover)': {
      textDecorationLine: 'underline',
    },
  },
});
globalStyle(`${Link}:focus-visible`, {
  borderRadius: '0.125rem',
  outline: '2px solid var(--color-blue)',
  textDecorationLine: 'none',
});

export const SeparatorRecipe = recipe({
  base: Container,
});
