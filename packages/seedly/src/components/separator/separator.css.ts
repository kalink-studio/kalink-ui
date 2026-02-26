import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';

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

const separatorColorDefaults = assignVars(separatorVars.color, {
  separator: sys.color.border.high,
  link: sys.color.content.base,
  linkDecoration: stateColor.subtleContent,
  focusRing: sys.color.tone.primary,
});

const separatorShapeDefaults = assignVars(separatorVars.shape, {
  focusCorner: '0.125rem',
});
export const separator = style({
  inlineSize: '100%',
  blockSize: '1px',
  backgroundColor: separatorVars.color.separator,
  vars: {
    ...separatorColorDefaults,
    ...separatorShapeDefaults,
  },
  selectors: {
    '&[data-orientation="vertical"]': {
      inlineSize: '1px',
      blockSize: '1.25rem',
    },
  },
});

export const link = style([
  typography.body.medium,
  {
    color: separatorVars.color.link,
    textDecorationColor: separatorVars.color.linkDecoration,
    textDecorationThickness: '1px',
    textDecorationLine: 'none',
    textUnderlineOffset: '2px',
    vars: {
      ...separatorColorDefaults,
      ...separatorShapeDefaults,
    },

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
  },
]);
