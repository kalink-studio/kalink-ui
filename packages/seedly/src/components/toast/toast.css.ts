import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const button = style({
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
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${button}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const viewport = style({
  position: 'fixed',
  zIndex: '1',
  width: '250px',
  margin: '0 auto',
  bottom: '1rem',
  right: '1rem',
  left: 'auto',
  top: 'auto',
  '@media': {
    '(min-width: 500px)': {
      bottom: '2rem',
      right: '2rem',
      width: '300px',
    },
  },
});

export const toast = style({
  position: 'absolute',
  right: '0',
  margin: '0 auto',
  boxSizing: 'border-box',
  background: 'var(--color-gray-50)',
  color: 'var(--color-gray-900)',
  border: '1px solid var(--color-gray-200)',
  padding: '1rem',
  width: '100%',
  boxShadow: '0 2px 10px rgb(0 0 0 / 0.1)',
  backgroundClip: 'padding-box',
  borderRadius: '0.5rem',
  transformOrigin: 'bottom center',
  bottom: '0',
  left: 'auto',
  marginRight: '0',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  transition:
    'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),\n    opacity 0.5s,\n    height 0.15s',
  cursor: 'default',
  zIndex: 'calc(1000 - var(--toast-index))',
  height: 'var(--height)',
  transform:
    'translateX(var(--toast-swipe-movement-x))\n    translateY(\n      calc(\n        var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) -\n          (var(--shrink) * var(--height))\n      )\n    )\n    scale(var(--scale))',
  vars: {
    '--gap': '0.75rem',
    '--peek': '0.75rem',
    '--scale': 'calc(max(0, 1 - (var(--toast-index) * 0.1)))',
    '--shrink': 'calc(1 - var(--scale))',
    '--height': 'var(--toast-frontmost-height, var(--toast-height))',
    '--offset-y':
      'calc(\n    var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) +\n      var(--toast-swipe-movement-y)\n  )',
  },
});
globalStyle(`${toast}[data-expanded]`, {
  transform:
    'translateX(var(--toast-swipe-movement-x)) translateY(var(--offset-y))',
  height: 'var(--toast-height)',
});
globalStyle(`${toast}[data-starting-style]`, {
  transform: 'translateY(150%)',
});
globalStyle(`${toast}[data-ending-style]`, {
  transform: 'translateY(150%)',
  opacity: '0',
});
globalStyle(`${toast}[data-limited]`, {
  opacity: '0',
});
globalStyle(`${toast}[data-ending-style][data-swipe-direction='up']`, {
  transform: 'translateY(calc(var(--toast-swipe-movement-y) - 150%))',
});
globalStyle(`${toast}[data-ending-style][data-swipe-direction='left']`, {
  transform:
    'translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(var(--offset-y))',
});
globalStyle(`${toast}[data-ending-style][data-swipe-direction='right']`, {
  transform:
    'translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(var(--offset-y))',
});
globalStyle(`${toast}[data-ending-style][data-swipe-direction='down']`, {
  transform: 'translateY(calc(var(--toast-swipe-movement-y) + 150%))',
});
globalStyle(`${toast}::after`, {
  content: "''",
  position: 'absolute',
  top: '100%',
  width: '100%',
  left: '0',
  height: 'calc(var(--gap) + 1px)',
});

export const content = style({
  overflow: 'hidden',
  transition: 'opacity 0.25s',
});
globalStyle(`${content}[data-behind]`, {
  opacity: '0',
});
globalStyle(`${content}[data-expanded]`, {
  opacity: '1',
});

export const title = style({
  fontWeight: '500',
  fontSize: '0.975rem',
  lineHeight: '1.25rem',
  margin: '0',
});

export const description = style({
  fontSize: '0.925rem',
  lineHeight: '1.25rem',
  margin: '0',
});

export const close = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  padding: '0',
  border: 'none',
  background: 'transparent',
  width: '1.25rem',
  height: '1.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.25rem',
});
globalStyle(`${close}:hover`, {
  backgroundColor: 'var(--color-gray-100)',
});

export const icon = style({
  width: '1rem',
  height: '1rem',
});

export const toastRecipe = recipe({
  base: button,
});
