import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const avatarVars = createThemeContract({
  color: {
    foreground: null,
    background: null,
  },
  shape: {
    corner: null,
  },
});

export const root = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle',
  borderRadius: avatarVars.shape.corner,
  userSelect: 'none',
  fontWeight: '500',
  color: avatarVars.color.foreground,
  backgroundColor: avatarVars.color.background,
  fontSize: '1rem',
  lineHeight: '1',
  overflow: 'hidden',
  height: '3rem',
  width: '3rem',
  vars: {
    ...assignVars(avatarVars.color, {
      foreground: sys.color.content.base,
      background: sys.color.container.low,
    }),
    ...assignVars(avatarVars.shape, {
      corner: '100%',
    }),
  },
});

export const image = style({
  objectFit: 'cover',
  height: '100%',
  width: '100%',
});

export const fallback = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  fontSize: '1rem',
});

export const avatarRecipe = recipe({
  base: root,
});
