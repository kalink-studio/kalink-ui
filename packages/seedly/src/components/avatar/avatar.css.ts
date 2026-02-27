import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';

export const avatarVars = createThemeContract({
  color: {
    foreground: null,
    background: null,
  },
  size: {
    root: null,
  },
  shape: {
    corner: null,
  },
});

export const root = style([
  typography.label.large,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    blockSize: avatarVars.size.root,
    inlineSize: avatarVars.size.root,
    overflow: 'hidden',

    color: avatarVars.color.foreground,
    backgroundColor: avatarVars.color.background,
    borderRadius: avatarVars.shape.corner,

    userSelect: 'none',
    verticalAlign: 'middle',

    vars: {
      ...assignVars(avatarVars.color, {
        foreground: sys.color.content.base,
        background: sys.color.container.low,
      }),
      ...assignVars(avatarVars.size, {
        root: sys.spacing[15],
      }),
      ...assignVars(avatarVars.shape, {
        corner: sys.shape.corner.circle,
      }),
    },
  },
]);

export const image = style({
  blockSize: '100%',
  inlineSize: '100%',

  objectFit: 'cover',
});

export const fallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: '100%',
  inlineSize: '100%',
});
