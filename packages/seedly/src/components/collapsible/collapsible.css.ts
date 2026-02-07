import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const collapsible = style({
  display: 'flex',
  width: '14rem',
  minHeight: '9rem',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'var(--color-gray-900)',
});

export const icon = style({
  width: '0.75rem',
  height: '0.75rem',
  transition: 'transform 150ms ease-out',
});

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  margin: '0',
  border: '0',
  outline: '0',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-100)',
  color: 'var(--color-gray-900)',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
});
globalStyle(`${trigger}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-200)',
    },
  },
});
globalStyle(`${trigger}:active`, {
  backgroundColor: 'var(--color-gray-200)',
});
globalStyle(`${trigger}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
});
globalStyle(`${trigger}[data-panel-open] ${icon}`, {
  transform: 'rotate(90deg)',
});

export const panel = style({
  display: 'flex',
  height: 'var(--collapsible-panel-height)',
  flexDirection: 'column',
  justifyContent: 'end',
  overflow: 'hidden',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  transition: 'all 150ms ease-out',
});
globalStyle(`${panel}[hidden]:not([hidden='until-found'])`, {
  display: 'none',
});
globalStyle(`${panel}[data-starting-style]`, {
  height: '0',
});
globalStyle(`${panel}[data-ending-style]`, {
  height: '0',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '0.25rem',
  padding: '0.5rem 0 0.5rem 1.75rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-100)',
  cursor: 'text',
});

export const collapsibleRecipe = recipe({
  base: collapsible,
});
