import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const toggleGroupVars = createThemeContract({
  color: {
    panelBorder: null,
    panelBackground: null,
    buttonForeground: null,
    buttonHoverBackground: null,
    buttonActiveBackground: null,
    buttonPressedBackground: null,
    buttonPressedForeground: null,
    focusRing: null,
  },
  shape: {
    panelCorner: null,
    buttonCorner: null,
  },
});

export const panel = style({
  display: 'flex',
  gap: '1px',
  border: `1px solid ${toggleGroupVars.color.panelBorder}`,
  backgroundColor: toggleGroupVars.color.panelBackground,
  borderRadius: toggleGroupVars.shape.panelCorner,
  padding: '0.125rem',
  vars: {
    ...assignVars(toggleGroupVars.color, {
      panelBorder: sys.color.container.high,
      panelBackground: sys.color.container.base,
      buttonForeground: stateColor.mutedContent,
      buttonHoverBackground: sys.color.container.low,
      buttonActiveBackground: sys.color.container.high,
      buttonPressedBackground: sys.color.container.low,
      buttonPressedForeground: sys.color.content.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(toggleGroupVars.shape, {
      panelCorner: '0.375rem',
      buttonCorner: '0.25rem',
    }),
  },
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  padding: '0',
  margin: '0',
  outline: '0',
  border: '0',
  borderRadius: toggleGroupVars.shape.buttonCorner,
  backgroundColor: 'transparent',
  color: toggleGroupVars.color.buttonForeground,
  userSelect: 'none',
});
globalStyle(`${button}:focus-visible`, {
  backgroundColor: 'transparent',
  outline: `2px solid ${toggleGroupVars.color.focusRing}`,
  outlineOffset: '-1px',
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: toggleGroupVars.color.buttonHoverBackground,
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: toggleGroupVars.color.buttonActiveBackground,
});
globalStyle(`${button}[data-pressed]`, {
  backgroundColor: toggleGroupVars.color.buttonPressedBackground,
  color: toggleGroupVars.color.buttonPressedForeground,
});

export const icon = style({
  width: '1rem',
  height: '1rem',
});

export const toggleGroupRecipe = recipe({
  base: panel,
});
