import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const progress = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '0.25rem',
  gridRowGap: '0.5rem',
  width: '12rem',
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
});

export const value = style({
  gridColumnStart: '2',
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-900)',
  textAlign: 'right',
});

export const track = style({
  gridColumn: '1 / 3',
  overflow: 'hidden',
  backgroundColor: 'var(--color-gray-200)',
  boxShadow: 'inset 0 0 0 1px var(--color-gray-200)',
  height: '0.25rem',
  borderRadius: '0.25rem',
});

export const indicator = style({
  display: 'block',
  backgroundColor: 'var(--color-gray-500)',
  transition: 'width 500ms',
});

export const progressRecipe = recipe({
  base: progress,
});
