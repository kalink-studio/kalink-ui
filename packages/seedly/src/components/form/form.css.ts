import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const formVars = createThemeContract({
  color: {
    label: null,
    inputForeground: null,
    inputBorder: null,
    inputFocusRing: null,
    error: null,
    buttonForeground: null,
    buttonBackground: null,
    buttonBorder: null,
    buttonHoverBackground: null,
    buttonActiveBackground: null,
    buttonActiveBorder: null,
    buttonFocusRing: null,
    buttonDisabledForeground: null,
  },
  shape: {
    inputCorner: null,
    buttonCorner: null,
  },
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '16rem',
  vars: {
    ...assignVars(formVars.color, {
      label: sys.color.content.base,
      inputForeground: sys.color.content.base,
      inputBorder: sys.color.container.high,
      inputFocusRing: sys.color.tone.primary,
      error: sys.color.tone.destructive,
      buttonForeground: sys.color.content.base,
      buttonBackground: sys.color.container.base,
      buttonBorder: sys.color.container.high,
      buttonHoverBackground: sys.color.container.low,
      buttonActiveBackground: sys.color.container.high,
      buttonActiveBorder: sys.color.container.top,
      buttonFocusRing: sys.color.tone.primary,
      buttonDisabledForeground: stateColor.disabledContent,
    }),
    ...assignVars(formVars.shape, {
      inputCorner: '0.375rem',
      buttonCorner: '0.375rem',
    }),
  },
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: formVars.color.label,
});

export const input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  margin: '0',
  border: `1px solid ${formVars.color.inputBorder}`,
  width: '100%',
  height: '2.5rem',
  borderRadius: formVars.shape.inputCorner,
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  color: formVars.color.inputForeground,

  selectors: {
    [`&:focus`]: {
      outline: `2px solid ${formVars.color.inputFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const error = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: formVars.color.error,
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
  border: `1px solid ${formVars.color.buttonBorder}`,
  borderRadius: formVars.shape.buttonCorner,
  backgroundColor: formVars.color.buttonBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: formVars.color.buttonForeground,
  userSelect: 'none',

  selectors: {
    [`&:hover:not([data-disabled])`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: formVars.color.buttonHoverBackground,
        },
      },
    },
    [`&:active:not([data-disabled])`]: {
      backgroundColor: formVars.color.buttonActiveBackground,
      boxShadow: sys.elevation.minimal,
      borderTopColor: formVars.color.buttonActiveBorder,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${formVars.color.buttonFocusRing}`,
      outlineOffset: '-1px',
    },
    [`&[data-disabled]`]: {
      color: formVars.color.buttonDisabledForeground,
    },
  },
});

export const formRecipe = recipe({
  base: form,
});
