import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
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
  paddingBlock: sys.spacing[1],
  paddingInline: sys.spacing[1],
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
  inlineSize: sys.spacing[12],
  blockSize: sys.spacing[12],
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  border: '0',
  borderRadius: toggleGroupVars.shape.buttonCorner,
  backgroundColor: 'transparent',
  color: toggleGroupVars.color.buttonForeground,
  userSelect: 'none',

  selectors: {
    [`&:focus-visible`]: {
      backgroundColor: 'transparent',
      outline: `2px solid ${toggleGroupVars.color.focusRing}`,
      outlineOffset: '-1px',
    },
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: toggleGroupVars.color.buttonHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: toggleGroupVars.color.buttonActiveBackground,
    },
    [`&[data-pressed]`]: {
      backgroundColor: toggleGroupVars.color.buttonPressedBackground,
      color: toggleGroupVars.color.buttonPressedForeground,
    },
  },
});

export const icon = style({
  inlineSize: sys.spacing[8],
  blockSize: sys.spacing[8],
});

export const toggleGroupRecipe = recipe({
  base: panel,
});
