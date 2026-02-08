import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
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
  gap: sys.spacing[4],
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
  inlineSize: sys.spacing[9],
  blockSize: sys.spacing[9],
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: checkboxVars.shape.corner,
  outline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  border: 'none',

  selectors: {
    [`&[data-unchecked]`]: {
      border: `1px solid ${checkboxVars.color.border}`,
      backgroundColor: 'transparent',
    },
    [`&[data-checked]`]: {
      backgroundColor: checkboxVars.color.checkedBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${checkboxVars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});

export const indicator = style({
  display: 'flex',
  color: checkboxVars.color.checkedForeground,

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

export const checkboxRecipe = recipe({
  base: label,
});
