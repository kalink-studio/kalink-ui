import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const checkboxVars = createThemeContract({
  color: {
    label: null,
    foreground: null,
    border: null,
    checkedBackground: null,
    checkedForeground: null,
    focusRing: null,
  },
  shape: {
    corner: null,
  },
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: checkboxVars.color.label,
  vars: {
    ...assignVars(checkboxVars.color, {
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.container.top,
      checkedBackground: sys.color.content.base,
      checkedForeground: sys.color.container.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(checkboxVars.shape, {
      corner: '0.25rem',
    }),
  },
});

export const checkbox = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '1.25rem',
  height: '1.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: checkboxVars.shape.corner,
  outline: '0',
  padding: '0',
  margin: '0',
  border: 'none',
});
globalStyle(`${checkbox}[data-unchecked]`, {
  border: `1px solid ${checkboxVars.color.border}`,
  backgroundColor: 'transparent',
});
globalStyle(`${checkbox}[data-checked]`, {
  backgroundColor: checkboxVars.color.checkedBackground,
});
globalStyle(`${checkbox}:focus-visible`, {
  outline: `2px solid ${checkboxVars.color.focusRing}`,
  outlineOffset: '2px',
});

export const indicator = style({
  display: 'flex',
  color: checkboxVars.color.checkedForeground,
});
globalStyle(`${indicator}[data-unchecked]`, {
  display: 'none',
});

export const icon = style({
  width: '0.75rem',
  height: '0.75rem',
});

export const checkboxRecipe = recipe({
  base: label,
});
