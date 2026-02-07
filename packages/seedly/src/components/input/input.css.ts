import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Label = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
});

export const Input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  margin: '0',
  border: '1px solid var(--color-gray-200)',
  width: '14rem',
  height: '2.5rem',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: 'normal',
  backgroundColor: 'transparent',
  color: 'var(--color-gray-900)',
});
globalStyle(`${Input}:focus`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const InputRecipe = recipe({
  base: Label,
});
