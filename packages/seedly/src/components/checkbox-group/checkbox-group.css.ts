import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const checkboxGroup = style({
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

export const checkbox = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '1.25rem',
  height: '1.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.25rem',
  outline: '0',
  padding: '0',
  margin: '0',
  border: 'none',
});
globalStyle(`${checkbox}[data-unchecked]`, {
  border: '1px solid var(--color-gray-300)',
  backgroundColor: 'transparent',
});
globalStyle(`${checkbox}[data-checked]`, {
  backgroundColor: 'var(--color-gray-900)',
});
globalStyle(`${checkbox}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '2px',
});

export const indicator = style({
  display: 'flex',
  color: 'var(--color-gray-50)',
});
globalStyle(`${indicator}[data-unchecked]`, {
  display: 'none',
});

export const icon = style({
  width: '0.75rem',
  height: '0.75rem',
});

export const checkboxGroupRecipe = recipe({
  base: checkboxGroup,
});
