import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const toggleGroupVars = createThemeContract({
  color: {
    itemFocusRing: null,
    itemPressedBackground: null,
    itemPressedHoverBackground: null,
    itemPressedForeground: null,
  },
  spacing: {
    groupGap: null,
  },
});

const toggleGroupDefaults = assignVars(toggleGroupVars, {
  color: {
    itemFocusRing: sys.color.tone.primary,
    itemPressedBackground: sys.color.container.high,
    itemPressedHoverBackground: sys.color.container.top,
    itemPressedForeground: sys.color.content.base,
  },
  spacing: {
    groupGap: sys.spacing[2],
  },
});

export const panel = style({
  '@layer': {
    [components]: {
      vars: toggleGroupDefaults,

      display: 'flex',
      gap: toggleGroupVars.spacing.groupGap,
    },
  },
});

export const button = style([
  {
    '@layer': {
      [components]: {
        borderWidth: '0',

        selectors: {
          '&[data-pressed]': {
            backgroundColor: toggleGroupVars.color.itemPressedBackground,
            color: toggleGroupVars.color.itemPressedForeground,
          },
          '&[data-pressed]:hover:not(:disabled):not([data-disabled]):not([data-loading])':
            {
              '@media': {
                '(hover: hover)': {
                  backgroundColor:
                    toggleGroupVars.color.itemPressedHoverBackground,
                  color: toggleGroupVars.color.itemPressedForeground,
                },
              },
            },
          '&:focus-visible': {
            outline: `2px solid ${toggleGroupVars.color.itemFocusRing}`,
            outlineOffset: '-1px',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
]);
