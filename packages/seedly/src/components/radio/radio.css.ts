import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
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
  gap: sys.spacing[2],
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
  gap: sys.spacing[4],
});

export const radio = style({
  boxSizing: 'border-box',
  display: 'flex',
  inlineSize: sys.spacing[9],
  blockSize: sys.spacing[9],
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  outline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  border: 'none',

  selectors: {
    [`&[data-unchecked]`]: {
      border: `1px solid ${radioVars.color.border}`,
      backgroundColor: 'transparent',
    },
    [`&[data-checked]`]: {
      backgroundColor: radioVars.color.checkedBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${radioVars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});

export const indicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    [`&[data-unchecked]`]: {
      display: 'none',
    },
    [`&::before`]: {
      content: "''",
      borderRadius: '100%',
      inlineSize: sys.spacing[4],
      blockSize: sys.spacing[4],
      backgroundColor: radioVars.color.checkedForeground,
    },
  },
});

export const radioRecipe = recipe({
  base: radioGroup,
});
