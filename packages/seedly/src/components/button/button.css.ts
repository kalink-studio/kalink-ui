import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const buttonVars = createThemeContract({
  color: {
    foreground: null,
    background: null,
    border: null,
    hoverBackground: null,
    activeBackground: null,
    activeBorder: null,
    focusRing: null,
    disabledForeground: null,
  },
  shape: {
    corner: null,
  },
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2.5rem',
  padding: '0 0.875rem',
  margin: '0',
  outline: '0',
  border: `1px solid ${buttonVars.color.border}`,
  borderRadius: buttonVars.shape.corner,
  backgroundColor: buttonVars.color.background,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: buttonVars.color.foreground,
  userSelect: 'none',
  vars: {
    ...assignVars(buttonVars.color, {
      foreground: sys.color.content.base,
      background: sys.color.container.base,
      border: sys.color.container.high,
      hoverBackground: sys.color.container.low,
      activeBackground: sys.color.container.high,
      activeBorder: sys.color.container.top,
      focusRing: sys.color.tone.primary,
      disabledForeground: stateColor.disabledContent,
    }),
    ...assignVars(buttonVars.shape, {
      corner: '0.375rem',
    }),
  },
});
globalStyle(`${button}:hover:not([data-disabled])`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: buttonVars.color.hoverBackground,
    },
  },
});
globalStyle(`${button}:active:not([data-disabled])`, {
  backgroundColor: buttonVars.color.activeBackground,
  boxShadow: sys.elevation.minimal,
  borderTopColor: buttonVars.color.activeBorder,
});
globalStyle(`${button}:focus-visible`, {
  outline: `2px solid ${buttonVars.color.focusRing}`,
  outlineOffset: '-1px',
});
globalStyle(`${button}[data-disabled]`, {
  color: buttonVars.color.disabledForeground,
});

export const buttonRecipe = recipe({
  base: button,
});
