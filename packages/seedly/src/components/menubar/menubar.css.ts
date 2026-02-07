import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const menubar = style({
  display: 'flex',
  backgroundColor: 'var(--color-gray-50)',
  border: '1px solid var(--color-gray-200)',
  borderRadius: '0.375rem',
  padding: '0.125rem',
});

export const menuTrigger = style({
  boxSizing: 'border-box',
  background: 'none',
  padding: '0 0.75rem',
  margin: '0',
  outline: '0',
  border: '0',
  color: 'var(--color-gray-600)',
  borderRadius: '0.25rem',
  userSelect: 'none',
  height: '2rem',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  fontWeight: '500',
});
globalStyle(`${menuTrigger}[data-pressed]`, {
  backgroundColor: 'var(--color-gray-100)',
  outline: 'none',
});
globalStyle(`${menuTrigger}:focus-visible`, {
  backgroundColor: 'var(--color-gray-100)',
  outline: 'none',
});
globalStyle(`${menuTrigger}[data-disabled]`, {
  opacity: '0.5',
});

export const menuPositioner = style({
  outline: '0',
});

export const menuPopup = style({
  boxSizing: 'border-box',
  paddingBlock: '0.25rem',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
  transformOrigin: 'var(--transform-origin)',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow:
        '0 10px 15px -3px var(--color-gray-200),\n      0 4px 6px -4px var(--color-gray-200)',
    },
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
      outlineOffset: '-1px',
    },
  },
});
globalStyle(`${menuPopup}[data-ending-style]`, {
  opacity: '0',
  transition: 'opacity 150ms',
});
globalStyle(`${menuPopup}[data-instant]`, {
  transition: 'none',
});

export const menuItem = style({
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  padding: '0.5rem 1rem',
  display: 'flex',
  fontSize: '0.875rem',
  lineHeight: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
});
globalStyle(`${menuItem}[data-popup-open]`, {
  zIndex: '0',
  position: 'relative',
});
globalStyle(`${menuItem}[data-popup-open]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.25rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${menuItem}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: 'var(--color-gray-50)',
});
globalStyle(`${menuItem}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.25rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-900)',
});

export const menuSeparator = style({
  margin: '0.375rem 1rem',
  height: '1px',
  backgroundColor: 'var(--color-gray-200)',
});

export const menubarRecipe = recipe({
  base: menubar,
});
