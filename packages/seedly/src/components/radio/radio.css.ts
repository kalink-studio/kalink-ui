import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const radioVars = createThemeContract({
  color: {
    foreground: null,
    border: null,
    checkedBackground: null,
    checkedForeground: null,
    focusRing: null,
  },
});

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
  color: radioVars.color.foreground,
  vars: assignVars(radioVars.color, {
    foreground: sys.color.content.base,
    border: sys.color.container.top,
    checkedBackground: sys.color.content.base,
    checkedForeground: sys.color.container.base,
    focusRing: sys.color.tone.primary,
  }),
});

export const caption = style({
  fontWeight: '500',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const radio = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '1.25rem',
  height: '1.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  outline: '0',
  padding: '0',
  margin: '0',
  border: 'none',
});
globalStyle(`${radio}[data-unchecked]`, {
  border: `1px solid ${radioVars.color.border}`,
  backgroundColor: 'transparent',
});
globalStyle(`${radio}[data-checked]`, {
  backgroundColor: radioVars.color.checkedBackground,
});
globalStyle(`${radio}:focus-visible`, {
  outline: `2px solid ${radioVars.color.focusRing}`,
  outlineOffset: '2px',
});

export const indicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
globalStyle(`${indicator}[data-unchecked]`, {
  display: 'none',
});
globalStyle(`${indicator}::before`, {
  content: "''",
  borderRadius: '100%',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: radioVars.color.checkedForeground,
});

export const radioRecipe = recipe({
  base: radioGroup,
});
