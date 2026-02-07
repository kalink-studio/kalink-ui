import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
  color: 'var(--color-gray-900)',
});

export const caption = style({
  fontWeight: '500',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const radio = style({
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
globalStyle(`${radio}[data-unchecked]`, {
  border: '1px solid var(--color-gray-300)',
  backgroundColor: 'transparent',
});
globalStyle(`${radio}[data-checked]`, {
  backgroundColor: 'var(--color-gray-900)',
});
globalStyle(`${radio}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '2px',
});

export const indicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
globalStyle(`${indicator}[data-unchecked]`, {
  display: 'none',
});
globalStyle(`${indicator}::before`, {
  content: "''",
  borderRadius: '100%',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: 'var(--color-gray-50)',
});

export const radioRecipe = recipe({
  base: radioGroup,
});
