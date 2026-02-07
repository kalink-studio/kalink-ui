import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const separatorVars = createThemeContract({
  color: {
    separator: null,
    link: null,
    linkDecoration: null,
    focusRing: null,
  },
  shape: {
    focusCorner: null,
  },
});

export const container = style({
  display: 'flex',
  gap: '1rem',
  textWrap: 'nowrap',
  vars: {
    ...assignVars(separatorVars.color, {
      separator: sys.color.container.top,
      link: sys.color.content.base,
      linkDecoration: stateColor.subtleContent,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(separatorVars.shape, {
      focusCorner: '0.125rem',
    }),
  },
});

export const separator = style({
  width: '1px',
  backgroundColor: separatorVars.color.separator,
});

export const link = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: separatorVars.color.link,
  textDecorationColor: separatorVars.color.linkDecoration,
  textDecorationThickness: '1px',
  textDecorationLine: 'none',
  textUnderlineOffset: '2px',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          textDecorationLine: 'underline',
        },
      },
    },
    [`&:focus-visible`]: {
      borderRadius: separatorVars.shape.focusCorner,
      outline: `2px solid ${separatorVars.color.focusRing}`,
      textDecorationLine: 'none',
    },
  },
});

export const separatorRecipe = recipe({
  base: container,
});
