import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const tooltipVars = createThemeContract({
  color: {
    panelBorder: null,
    panelBackground: null,
    buttonForeground: null,
    buttonHoverBackground: null,
    buttonActiveBackground: null,
    focusRing: null,
    popupForeground: null,
    popupBackground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    popupShadow: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
  },
  shape: {
    panelCorner: null,
    buttonCorner: null,
    popupCorner: null,
  },
});

const tooltipColorDefaults = assignVars(tooltipVars.color, {
  panelBorder: sys.color.container.high,
  panelBackground: sys.color.container.base,
  buttonForeground: sys.color.content.base,
  buttonHoverBackground: sys.color.container.low,
  buttonActiveBackground: sys.color.container.high,
  focusRing: sys.color.tone.primary,
  popupForeground: sys.color.content.base,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.container.high,
  popupOutlineDark: sys.color.container.top,
  popupShadow: sys.elevation.moderate,
  arrowOuterStroke: sys.color.container.high,
  arrowInnerStroke: sys.color.container.top,
});

const tooltipShapeDefaults = assignVars(tooltipVars.shape, {
  panelCorner: '0.375rem',
  buttonCorner: '0.25rem',
  popupCorner: '0.375rem',
});

export const panel = style({
  display: 'flex',
  border: `1px solid ${tooltipVars.color.panelBorder}`,
  backgroundColor: tooltipVars.color.panelBackground,
  borderRadius: tooltipVars.shape.panelCorner,
  paddingBlock: sys.spacing[1],
  paddingInline: sys.spacing[1],
  vars: {
    ...tooltipColorDefaults,
    ...tooltipShapeDefaults,
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
  borderRadius: tooltipVars.shape.buttonCorner,
  backgroundColor: 'transparent',
  color: tooltipVars.color.buttonForeground,
  userSelect: 'none',

  selectors: {
    [`&[data-popup-open]`]: {
      backgroundColor: tooltipVars.color.buttonHoverBackground,
    },
    [`&:focus-visible`]: {
      backgroundColor: 'transparent',
      outline: `2px solid ${tooltipVars.color.focusRing}`,
      outlineOffset: '-1px',
    },
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: tooltipVars.color.buttonHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: tooltipVars.color.buttonActiveBackground,
    },
  },
});

export const icon = style({
  inlineSize: sys.spacing[8],
  blockSize: sys.spacing[8],
});

export const positioner = style({
  vars: {
    ...tooltipColorDefaults,
    ...tooltipShapeDefaults,
  },
});

export const popup = style({
  boxSizing: 'border-box',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: sys.spacing[2],
  paddingInline: sys.spacing[4],
  borderRadius: tooltipVars.shape.popupCorner,
  backgroundColor: tooltipVars.color.popupBackground,
  color: tooltipVars.color.popupForeground,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${tooltipVars.color.popupOutlineLight}`,
      boxShadow: tooltipVars.color.popupShadow,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${tooltipVars.color.popupOutlineDark}`,
      outlineOffset: '-1px',
    },
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
    },
    [`&[data-instant]`]: {
      transition: 'none',
    },
  },
});

export const arrow = style({
  display: 'flex',

  selectors: {
    [`&[data-side='top']`]: {
      bottom: calc.negate(sys.spacing[4]),
      rotate: '180deg',
    },
    [`&[data-side='bottom']`]: {
      top: calc.negate(sys.spacing[4]),
      rotate: '0deg',
    },
    [`&[data-side='left']`]: {
      right: calc.negate(sys.spacing[7]),
      rotate: '90deg',
    },
    [`&[data-side='right']`]: {
      left: calc.negate(sys.spacing[7]),
      rotate: '-90deg',
    },
  },
});

export const arrowFill = style({
  fill: tooltipVars.color.popupBackground,
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: tooltipVars.color.arrowOuterStroke,
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: tooltipVars.color.arrowInnerStroke,
    },
  },
});

export const tooltipRecipe = recipe({
  base: panel,
});
