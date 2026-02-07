import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

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

export const panel = style({
  display: 'flex',
  gap: '1px',
  border: `1px solid ${toggleVars.color.panelBorder}`,
  backgroundColor: toggleVars.color.panelBackground,
  borderRadius: toggleVars.shape.panelCorner,
  padding: '0.125rem',
  vars: {
    ...assignVars(toggleVars.color, {
      panelBorder: sys.color.container.high,
      panelBackground: sys.color.container.base,
      buttonForeground: stateColor.mutedContent,
      buttonHoverBackground: sys.color.container.low,
      buttonActiveBackground: sys.color.container.high,
      buttonPressedForeground: sys.color.content.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(toggleVars.shape, {
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
  borderRadius: toggleVars.shape.buttonCorner,
  backgroundColor: 'transparent',
  color: toggleVars.color.buttonForeground,
  userSelect: 'none',
});
globalStyle(`${button}:focus-visible`, {
  backgroundColor: 'transparent',
  outline: `2px solid ${toggleVars.color.focusRing}`,
  outlineOffset: '-1px',
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: toggleVars.color.buttonHoverBackground,
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: toggleVars.color.buttonActiveBackground,
});
globalStyle(`${button}[data-pressed]`, {
  color: toggleVars.color.buttonPressedForeground,
});

export const icon = style({
  width: '1.25rem',
  height: '1.25rem',
});

export const toggleRecipe = recipe({
  base: panel,
});
