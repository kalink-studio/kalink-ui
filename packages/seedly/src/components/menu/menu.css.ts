import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const menuVars = createThemeContract({
  color: {
    triggerForeground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerHoverBackground: null,
    triggerFocusRing: null,
    popupBackground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    popupShadow: null,
    itemHighlightedForeground: null,
    itemHighlightedBackground: null,
    separator: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
    itemCorner: null,
  },
});

const menuColorDefaults = assignVars(menuVars.color, {
  triggerForeground: sys.color.content.base,
  triggerBackground: sys.color.container.base,
  triggerBorder: sys.color.container.high,
  triggerHoverBackground: sys.color.container.low,
  triggerFocusRing: sys.color.tone.primary,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.container.high,
  popupOutlineDark: sys.color.container.top,
  popupShadow: sys.elevation.moderate,
  itemHighlightedForeground: sys.color.container.base,
  itemHighlightedBackground: sys.color.content.base,
  separator: sys.color.container.high,
  arrowOuterStroke: sys.color.container.high,
  arrowInnerStroke: sys.color.container.top,
});

const menuShapeDefaults = assignVars(menuVars.shape, {
  triggerCorner: '0.375rem',
  popupCorner: '0.375rem',
  itemCorner: '0.25rem',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: sys.spacing[3],
  blockSize: sys.spacing[14],
  paddingBlock: '0',
  paddingInline: sys.spacing[7],
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  border: `1px solid ${menuVars.color.triggerBorder}`,
  borderRadius: menuVars.shape.triggerCorner,
  backgroundColor: menuVars.color.triggerBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: menuVars.color.triggerForeground,
  userSelect: 'none',
  vars: {
    ...menuColorDefaults,
    ...menuShapeDefaults,
  },

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: menuVars.color.triggerHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: menuVars.color.triggerHoverBackground,
    },
    [`&[data-popup-open]`]: {
      backgroundColor: menuVars.color.triggerHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${menuVars.color.triggerFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const buttonIcon = style({
  marginInlineEnd: calc.negate(sys.spacing[2]),
});

export const positioner = style({
  outline: '0',
  vars: {
    ...menuColorDefaults,
    ...menuShapeDefaults,
  },
});

export const popup = style({
  boxSizing: 'border-box',
  paddingBlock: sys.spacing[2],
  borderRadius: menuVars.shape.popupCorner,
  backgroundColor: menuVars.color.popupBackground,
  color: menuVars.color.triggerForeground,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${menuVars.color.popupOutlineLight}`,
      boxShadow: menuVars.color.popupShadow,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${menuVars.color.popupOutlineDark}`,
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
  fill: menuVars.color.popupBackground,
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: menuVars.color.arrowOuterStroke,
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: menuVars.color.arrowInnerStroke,
    },
  },
});

export const item = style({
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[8],
  paddingInlineEnd: sys.spacing[12],
  display: 'flex',
  fontSize: '0.875rem',
  lineHeight: '1rem',

  selectors: {
    [`&[data-highlighted]`]: {
      zIndex: '0',
      position: 'relative',
      color: menuVars.color.itemHighlightedForeground,
    },
    [`&[data-highlighted]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: sys.spacing[2],
      borderRadius: menuVars.shape.itemCorner,
      backgroundColor: menuVars.color.itemHighlightedBackground,
    },
  },
});

export const separator = style({
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  blockSize: '1px',
  backgroundColor: menuVars.color.separator,
});

export const menuRecipe = recipe({
  base: button,
});
