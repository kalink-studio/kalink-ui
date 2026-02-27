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
  size: {
    blockSize: null,
    verticalInlineSize: null,
    verticalBlockSize: null,
  },
});

const separatorColorDefaults = assignVars(separatorVars.color, {
  separator: sys.color.border.high,
  link: sys.color.content.base,
  linkDecoration: stateColor.subtleContent,
  focusRing: sys.color.tone.primary,
});

const separatorShapeDefaults = assignVars(separatorVars.shape, {
  focusCorner: sys.shape.corner.sharp,
});

const separatorSizeDefaults = assignVars(separatorVars.size, {
  blockSize: '1px',
  verticalInlineSize: '1px',
  verticalBlockSize: sys.spacing[9],
});
export const separator = style({
  inlineSize: '100%',
  blockSize: separatorVars.size.blockSize,
  backgroundColor: separatorVars.color.separator,
  vars: {
    ...separatorColorDefaults,
    ...separatorShapeDefaults,
    ...separatorSizeDefaults,
  },
  selectors: {
    '&[data-orientation="vertical"]': {
      inlineSize: separatorVars.size.verticalInlineSize,
      blockSize: separatorVars.size.verticalBlockSize,
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
      ...separatorSizeDefaults,
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
