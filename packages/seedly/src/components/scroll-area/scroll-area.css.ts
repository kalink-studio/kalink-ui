import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const scrollArea = style({
  boxSizing: 'border-box',
  width: '24rem',
  height: '8.5rem',
  maxWidth: 'calc(100vw - 8rem)',
});

export const viewport = style({
  height: '100%',
  borderRadius: '0.375rem',
  outline: `1px solid ${sys.color.container.high}`,
  outlineOffset: '-1px',
});
globalStyle(`${viewport}:focus-visible`, {
  outline: `2px solid ${sys.color.tone.primary}`,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingBlock: '0.75rem',
  paddingLeft: '1rem',
  paddingRight: '1.5rem',
});

export const paragraph = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.375rem',
  color: sys.color.content.base,
});

export const scrollbar = style({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: sys.color.container.high,
  width: '0.25rem',
  borderRadius: '0.375rem',
  margin: '0.5rem',
  opacity: '0',
  transition: 'opacity 150ms',
  pointerEvents: 'none',
});
globalStyle(`${scrollbar}[data-scrolling]`, {
  transitionDuration: '0ms',
  opacity: '1',
  pointerEvents: 'auto',
});
globalStyle(`${scrollbar}[data-hovering]`, {
  opacity: '1',
  pointerEvents: 'auto',
});
globalStyle(`${scrollbar}::before`, {
  content: "''",
  position: 'absolute',
  width: '1.25rem',
  height: '100%',
});

export const thumb = style({
  width: '100%',
  borderRadius: 'inherit',
  backgroundColor: stateColor.disabledContent,
});

export const scrollAreaRecipe = recipe({
  base: scrollArea,
});
