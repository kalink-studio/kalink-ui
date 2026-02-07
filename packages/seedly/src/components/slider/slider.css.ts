import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const control = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  width: '14rem',
  paddingBlock: '0.75rem',
  touchAction: 'none',
  userSelect: 'none',
});

export const track = style({
  width: '100%',
  height: '0.25rem',
  backgroundColor: 'var(--color-gray-200)',
  boxShadow: 'inset 0 0 0 1px var(--color-gray-200)',
  borderRadius: '0.25rem',
  userSelect: 'none',
});

export const indicator = style({
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-700)',
  userSelect: 'none',
});

export const thumb = style({
  width: '1rem',
  height: '1rem',
  borderRadius: '100%',
  backgroundColor: 'white',
  outline: '1px solid var(--color-gray-300)',
  userSelect: 'none',
});
globalStyle(`${thumb}:has(:focus-visible)`, {
  outline: '2px solid var(--color-blue)',
});

export const sliderRecipe = recipe({
  base: control,
});
