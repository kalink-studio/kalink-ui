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
});

export const panel = style({
  display: 'flex',
  gap: '1px',
  vars: {
    ...assignVars(toggleGroupVars.color, {
      buttonForeground: sys.color.content.base,
      buttonHoverBackground: sys.color.container.low,
      buttonActiveBackground: sys.color.container.high,
      buttonPressedBackground: sys.color.container.high,
      buttonPressedForeground: sys.color.content.base,
      focusRing: sys.color.tone.primary,
    }),
  },
});

export const button = style([
  {
    minInlineSize: sys.spacing[12],
    blockSize: sys.spacing[12],
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
