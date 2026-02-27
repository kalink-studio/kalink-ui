import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';

export const avatarVars = createThemeContract({
  color: {
    rootBackground: null,
    rootForeground: null,
  },
  shape: {
    rootCorner: null,
  },
  size: {
    rootSize: null,
  },
});

const avatarDefaults = assignVars(avatarVars, {
  color: {
    rootBackground: sys.color.container.low,
    rootForeground: sys.color.content.base,
  },
  shape: {
    rootCorner: sys.shape.corner.circle,
  },
  size: {
    rootSize: sys.spacing[15],
  },
});

export const root = style([
  typography.label.large,
  {
    vars: avatarDefaults,

    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',

    blockSize: avatarVars.size.rootSize,
    inlineSize: avatarVars.size.rootSize,
    overflow: 'hidden',

    backgroundColor: avatarVars.color.rootBackground,
    borderRadius: avatarVars.shape.rootCorner,
    color: avatarVars.color.rootForeground,

    userSelect: 'none',
    verticalAlign: 'middle',
  },
]);

export const image = style({
  blockSize: '100%',
  inlineSize: '100%',

  objectFit: 'cover',
});

export const fallback = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',

  blockSize: '100%',
  inlineSize: '100%',
});
