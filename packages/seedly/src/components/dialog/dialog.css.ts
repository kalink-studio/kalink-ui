import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
globalStyle(`${Button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Button}:active`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${Button}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Backdrop = style({
  position: 'fixed',
  minHeight: '100dvh',
  inset: '0',
  backgroundColor: 'black',
  opacity: '0.2',
  transition: 'opacity 150ms cubic-bezier(0.45, 1.005, 0, 1.005)',
  '@supports': {
    '(-webkit-touch-callout: none)': {
      position: 'absolute',
    },
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      opacity: '0.7',
    },
  },
});
globalStyle(`${Backdrop}[data-starting-style]`, {
  opacity: '0',
});
globalStyle(`${Backdrop}[data-ending-style]`, {
  opacity: '0',
});

export const Popup = style({
  boxSizing: 'border-box',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '24rem',
  maxWidth: 'calc(100vw - 3rem)',
  marginTop: '-2rem',
  padding: '1.5rem',
  borderRadius: '0.5rem',
  outline: '1px solid var(--color-gray-200)',
  backgroundColor: 'var(--color-gray-50)',
  color: 'var(--color-gray-900)',
  transition: 'all 150ms',
  '@media': {
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
    },
  },
});
globalStyle(`${Popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'translate(-50%, -50%) scale(0.9)',
});
globalStyle(`${Popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'translate(-50%, -50%) scale(0.9)',
});

export const Title = style({
  marginTop: '-0.375rem',
  marginBottom: '0.25rem',
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  letterSpacing: '-0.0025em',
  fontWeight: '500',
});

export const Description = style({
  margin: '0 0 1.5rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-600)',
});

export const Actions = style({
  display: 'flex',
  justifyContent: 'end',
  gap: '1rem',
});

export const DialogRecipe = recipe({
  base: Button,
});
