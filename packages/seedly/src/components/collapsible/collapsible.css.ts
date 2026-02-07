import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Collapsible = style({
  display: 'flex',
  width: '14rem',
  minHeight: '9rem',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'var(--color-gray-900)',
});

export const Icon = style({
  width: '0.75rem',
  height: '0.75rem',
  transition: 'transform 150ms ease-out',
});

export const Trigger = style({
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
globalStyle(`${Trigger}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-200)',
    },
  },
});
globalStyle(`${Trigger}:active`, {
  backgroundColor: 'var(--color-gray-200)',
});
globalStyle(`${Trigger}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
});
globalStyle(`${Trigger}[data-panel-open] ${Icon}`, {
  transform: 'rotate(90deg)',
});

export const Panel = style({
  display: 'flex',
  height: 'var(--collapsible-panel-height)',
  flexDirection: 'column',
  justifyContent: 'end',
  overflow: 'hidden',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  transition: 'all 150ms ease-out',
});
globalStyle(`${Panel}[hidden]:not([hidden='until-found'])`, {
  display: 'none',
});
globalStyle(`${Panel}[data-starting-style]`, {
  height: '0',
});
globalStyle(`${Panel}[data-ending-style]`, {
  height: '0',
});

export const Content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '0.25rem',
  padding: '0.5rem 0 0.5rem 1.75rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-100)',
  cursor: 'text',
});

export const CollapsibleRecipe = recipe({
  base: Collapsible,
});
