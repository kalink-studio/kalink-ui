import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '16rem',
});

export const Field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
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

export const Button = style({
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
globalStyle(`${Button}:hover:not([data-disabled])`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Button}:active:not([data-disabled])`, {
  backgroundColor: 'var(--color-gray-200)',
  boxShadow: 'inset 0 1px 3px var(--color-gray-200)',
  borderTopColor: 'var(--color-gray-300)',
});
globalStyle(`${Button}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});
globalStyle(`${Button}[data-disabled]`, {
  color: 'var(--color-gray-500)',
});

export const FormRecipe = recipe({
  base: Form,
});
