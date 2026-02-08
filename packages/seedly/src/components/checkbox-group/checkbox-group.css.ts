import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const checkboxGroupVars = createThemeContract({
  color: {
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

export const checkboxGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: sys.spacing[2],
  color: checkboxGroupVars.color.foreground,
  vars: {
    ...assignVars(checkboxGroupVars.color, {
      foreground: sys.color.content.base,
      border: sys.color.container.top,
      checkedBackground: sys.color.content.base,
      checkedForeground: sys.color.container.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(checkboxGroupVars.shape, {
      corner: '0.25rem',
    }),
  },
});

export const caption = style({
  fontWeight: '500',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
});

export const checkbox = style({
  boxSizing: 'border-box',
  display: 'flex',
  inlineSize: sys.spacing[9],
  blockSize: sys.spacing[9],
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: checkboxGroupVars.shape.corner,
  outline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  border: 'none',

  selectors: {
    [`&[data-unchecked]`]: {
      border: `1px solid ${checkboxGroupVars.color.border}`,
      backgroundColor: 'transparent',
    },
    [`&[data-checked]`]: {
      backgroundColor: checkboxGroupVars.color.checkedBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${checkboxGroupVars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});

export const indicator = style({
  display: 'flex',
  color: checkboxGroupVars.color.checkedForeground,

  selectors: {
    [`&[data-unchecked]`]: {
      display: 'none',
    },
  },
});

export const icon = style({
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
});

export const checkboxGroupRecipe = recipe({
  base: checkboxGroup,
});
