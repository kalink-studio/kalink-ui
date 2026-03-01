import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';

export const toggleGroupVars = createThemeContract({
  color: {
    itemFocusRing: null,
    itemPressedBackground: null,
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
    itemPressedForeground: sys.color.content.base,
  },
  spacing: {
    groupGap: '1px',
  },
});

export const panel = style({
  vars: toggleGroupDefaults,

  display: 'flex',
  gap: toggleGroupVars.spacing.groupGap,
});

export const button = style([
  {
    borderWidth: '0',

    selectors: {
      '&[data-pressed]': {
        backgroundColor: toggleGroupVars.color.itemPressedBackground,
        color: toggleGroupVars.color.itemPressedForeground,
      },
      '&:focus-visible': {
        outline: `2px solid ${toggleGroupVars.color.itemFocusRing}`,
        outlineOffset: '-1px',
        backgroundColor: 'transparent',
      },
    },
  },
]);
