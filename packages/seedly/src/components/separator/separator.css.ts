import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import { atoms } from '../../styles/layers.css';

export const separatorVars = createThemeContract({
  color: {
    linkFocusRing: null,
    linkForeground: null,
    linkUnderline: null,
    rootBackground: null,
  },

  shape: {
    linkFocusCorner: null,
  },

  size: {
    linkUnderlineThickness: null,
    rootBlockSize: null,
    rootVerticalBlockSize: null,
    rootVerticalInlineSize: null,
  },

  spacing: {
    linkUnderlineOffset: null,
  },
});

const separatorDefaults = assignVars(separatorVars, {
  color: {
    linkFocusRing: sys.color.tone.primary,
    linkForeground: sys.color.content.base,
    linkUnderline: stateColor.subtleContent,
    rootBackground: sys.color.border.high,
  },

  shape: {
    linkFocusCorner: sys.shape.corner.sharp,
  },

  size: {
    linkUnderlineThickness: '1px',
    rootBlockSize: '1px',
    rootVerticalBlockSize: sys.spacing[9],
    rootVerticalInlineSize: '1px',
  },

  spacing: {
    linkUnderlineOffset: '2px',
  },
});

export const separator = style({
  '@layer': {
    [atoms]: {
      vars: {
        ...separatorDefaults,
      },

      blockSize: separatorVars.size.rootBlockSize,
      inlineSize: '100%',

      backgroundColor: separatorVars.color.rootBackground,

      selectors: {
        '&[data-orientation="vertical"]': {
          blockSize: separatorVars.size.rootVerticalBlockSize,
          inlineSize: separatorVars.size.rootVerticalInlineSize,
        },
      },
    },
  },
});

export const link = style([
  typography.body.medium,
  {
    '@layer': {
      [atoms]: {
        vars: {
          ...separatorDefaults,
        },

        textDecorationLine: 'none',
        textDecorationThickness: separatorVars.size.linkUnderlineThickness,
        textUnderlineOffset: separatorVars.spacing.linkUnderlineOffset,

        color: separatorVars.color.linkForeground,
        textDecorationColor: separatorVars.color.linkUnderline,

        selectors: {
          '&:focus-visible': {
            borderRadius: separatorVars.shape.linkFocusCorner,
            outline: `2px solid ${separatorVars.color.linkFocusRing}`,
            textDecorationLine: 'none',
          },

          '&:hover': {
            '@media': {
              '(hover: hover)': {
                textDecorationLine: 'underline',
              },
            },
          },
        },
      },
    },
  },
]);
