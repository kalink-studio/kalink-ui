import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
  width: '100%',
  maxWidth: '16rem',
});

export const Label = style({
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
  width: '100%',
  height: '2.5rem',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  color: 'var(--color-gray-900)',
});
globalStyle(`${Input}:focus`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Error = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-red-800)',
});

export const Description = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-600)',
});

export const FieldRecipe = recipe({
  base: Field,
});
