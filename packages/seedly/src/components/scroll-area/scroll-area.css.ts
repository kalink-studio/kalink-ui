import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const ScrollArea = style({
  boxSizing: 'border-box',
  width: '24rem',
  height: '8.5rem',
  maxWidth: 'calc(100vw - 8rem)',
});

export const Viewport = style({
  height: '100%',
  borderRadius: '0.375rem',
  outline: '1px solid var(--color-gray-200)',
  outlineOffset: '-1px',
});
globalStyle(`${Viewport}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
});

export const Content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingBlock: '0.75rem',
  paddingLeft: '1rem',
  paddingRight: '1.5rem',
});

export const Paragraph = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.375rem',
  color: 'var(--color-gray-900)',
});

export const Scrollbar = style({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'var(--color-gray-200)',
  width: '0.25rem',
  borderRadius: '0.375rem',
  margin: '0.5rem',
  opacity: '0',
  transition: 'opacity 150ms',
  pointerEvents: 'none',
});
globalStyle(`${Scrollbar}[data-scrolling]`, {
  transitionDuration: '0ms',
  opacity: '1',
  pointerEvents: 'auto',
});
globalStyle(`${Scrollbar}[data-hovering]`, {
  opacity: '1',
  pointerEvents: 'auto',
});
globalStyle(`${Scrollbar}::before`, {
  content: "''",
  position: 'absolute',
  width: '1.25rem',
  height: '100%',
});

export const Thumb = style({
  width: '100%',
  borderRadius: 'inherit',
  backgroundColor: 'var(--color-gray-500)',
});

export const ScrollAreaRecipe = recipe({
  base: ScrollArea,
});
