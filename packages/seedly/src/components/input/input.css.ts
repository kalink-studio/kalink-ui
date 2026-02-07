import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const inputVars = createThemeContract({
  color: {
    label: null,
    foreground: null,
    border: null,
    focusRing: null,
  },
  shape: {
    corner: null,
  },
});

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: inputVars.color.label,
  vars: {
    ...assignVars(inputVars.color, {
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.container.high,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(inputVars.shape, {
      corner: '0.375rem',
    }),
  },
});

export const input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  margin: '0',
  border: `1px solid ${inputVars.color.border}`,
  width: '14rem',
  height: '2.5rem',
  borderRadius: inputVars.shape.corner,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: 'normal',
  backgroundColor: 'transparent',
  color: inputVars.color.foreground,

  selectors: {
    [`&:focus`]: {
      outline: `2px solid ${inputVars.color.focusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const inputRecipe = recipe({
  base: label,
});
