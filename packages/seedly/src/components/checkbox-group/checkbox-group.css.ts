import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const CheckboxGroup = style({
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

export const Checkbox = style({
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
globalStyle(`${Checkbox}[data-unchecked]`, {
  border: '1px solid var(--color-gray-300)',
  backgroundColor: 'transparent',
});
globalStyle(`${Checkbox}[data-checked]`, {
  backgroundColor: 'var(--color-gray-900)',
});
globalStyle(`${Checkbox}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '2px',
});

export const Indicator = style({
  display: 'flex',
  color: 'var(--color-gray-50)',
});
globalStyle(`${Indicator}[data-unchecked]`, {
  display: 'none',
});

export const Icon = style({
  width: '0.75rem',
  height: '0.75rem',
});

export const CheckboxGroupRecipe = recipe({
  base: CheckboxGroup,
});
