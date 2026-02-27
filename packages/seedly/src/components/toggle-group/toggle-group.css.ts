import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';

export const toggleGroupVars = createThemeContract({
  color: {
    buttonForeground: null,
    buttonHoverBackground: null,
    buttonActiveBackground: null,
    buttonPressedBackground: null,
    buttonPressedForeground: null,
    focusRing: null,
  },
  spacing: {
    panelGap: null,
  },
});

const toggleGroupSpacingDefaults = assignVars(toggleGroupVars.spacing, {
  panelGap: '1px',
});

export const panel = style({
  display: 'flex',
  gap: toggleGroupVars.spacing.panelGap,
  vars: {
    ...assignVars(toggleGroupVars.color, {
      buttonForeground: sys.color.content.base,
      buttonHoverBackground: sys.color.container.low,
      buttonActiveBackground: sys.color.container.high,
      buttonPressedBackground: sys.color.container.high,
      buttonPressedForeground: sys.color.content.base,
      focusRing: sys.color.tone.primary,
    }),
    ...toggleGroupSpacingDefaults,
  },
});

export const button = style([
  {
    borderWidth: '0',

    selectors: {
      '&[data-pressed]': {
        backgroundColor: toggleGroupVars.color.buttonPressedBackground,
        color: toggleGroupVars.color.buttonPressedForeground,
      },
      '&:focus-visible': {
        outline: `2px solid ${toggleGroupVars.color.focusRing}`,
        outlineOffset: '-1px',
        backgroundColor: 'transparent',
      },
    },
  },
]);
