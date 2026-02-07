import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const RadioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
  color: 'var(--color-gray-900)',
});

export const Caption = style({
  fontWeight: '500',
});

export const Item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const Radio = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '1.25rem',
  height: '1.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  outline: '0',
  padding: '0',
  margin: '0',
  border: 'none',
});
globalStyle(`${Radio}[data-unchecked]`, {
  border: '1px solid var(--color-gray-300)',
  backgroundColor: 'transparent',
});
globalStyle(`${Radio}[data-checked]`, {
  backgroundColor: 'var(--color-gray-900)',
});
globalStyle(`${Radio}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '2px',
});

export const Indicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
globalStyle(`${Indicator}[data-unchecked]`, {
  display: 'none',
});
globalStyle(`${Indicator}::before`, {
  content: "''",
  borderRadius: '100%',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: 'var(--color-gray-50)',
});

export const RadioRecipe = recipe({
  base: RadioGroup,
});
