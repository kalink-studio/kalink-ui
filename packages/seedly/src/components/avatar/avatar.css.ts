import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Root = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle',
  borderRadius: '100%',
  userSelect: 'none',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
  backgroundColor: 'var(--color-gray-100)',
  fontSize: '1rem',
  lineHeight: '1',
  overflow: 'hidden',
  height: '3rem',
  width: '3rem',
});

export const Image = style({
  objectFit: 'cover',
  height: '100%',
  width: '100%',
});

export const Fallback = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  fontSize: '1rem',
});

export const AvatarRecipe = recipe({
  base: Root,
});
