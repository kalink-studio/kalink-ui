import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const fieldset = style({
  border: '0',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '16rem',
});

export const legend = style({
  borderBottom: '1px solid var(--color-gray-200)',
  paddingBottom: '0.75rem',
  fontWeight: '500',
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  letterSpacing: '-0.0025em',
  color: 'var(--color-gray-900)',
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
});

export const input = style({
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
globalStyle(`${input}:focus`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const error = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-red-800)',
});

export const description = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-600)',
});

export const fieldsetRecipe = recipe({
  base: fieldset,
});
