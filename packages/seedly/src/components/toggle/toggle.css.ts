import { createThemeContract, style } from '@vanilla-extract/css';

export const toggleVars = createThemeContract({
  color: {
    panelBorder: null,
    panelBackground: null,
    buttonForeground: null,
    buttonHoverBackground: null,
    buttonActiveBackground: null,
    buttonPressedForeground: null,
    focusRing: null,
  },
  shape: {
    panelCorner: null,
    buttonCorner: null,
  },
});
export const button = style([
  {
    borderWidth: '0',

    selectors: {
      '&[data-pressed]': {
        color: toggleVars.color.buttonPressedForeground,
      },
      '&:focus-visible': {
        outline: `2px solid ${toggleVars.color.focusRing}`,
        outlineOffset: '-1px',
        backgroundColor: 'transparent',
      },
    },
  },
]);
