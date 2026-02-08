import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const popoverVars = createThemeContract({
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
    popupDescription: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
  },
});

const popoverColorDefaults = assignVars(popoverVars.color, {
  triggerForeground: sys.color.content.base,
  triggerBackground: sys.color.container.base,
  triggerBorder: sys.color.container.high,
  triggerHoverBackground: sys.color.container.low,
  triggerFocusRing: sys.color.tone.primary,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.container.high,
  popupOutlineDark: sys.color.container.top,
  popupShadow: sys.elevation.moderate,
  popupDescription: stateColor.mutedContent,
  arrowOuterStroke: sys.color.container.high,
  arrowInnerStroke: sys.color.container.top,
});

const popoverShapeDefaults = assignVars(popoverVars.shape, {
  triggerCorner: '0.375rem',
  popupCorner: '0.5rem',
});

export const iconButton = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: sys.spacing[14],
  blockSize: sys.spacing[14],
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  border: `1px solid ${popoverVars.color.triggerBorder}`,
  borderRadius: popoverVars.shape.triggerCorner,
  backgroundColor: popoverVars.color.triggerBackground,
  color: popoverVars.color.triggerForeground,
  userSelect: 'none',
  vars: {
    ...popoverColorDefaults,
    ...popoverShapeDefaults,
  },

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: popoverVars.color.triggerHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: popoverVars.color.triggerHoverBackground,
    },
    [`&[data-popup-open]`]: {
      backgroundColor: popoverVars.color.triggerHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${popoverVars.color.triggerFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const icon = style({
  inlineSize: sys.spacing[9],
  blockSize: sys.spacing[9],
});

export const positioner = style({
  inlineSize: 'var(--positioner-width)',
  blockSize: 'var(--positioner-height)',
  maxInlineSize: 'var(--available-width)',
  vars: {
    ...popoverColorDefaults,
    ...popoverShapeDefaults,
  },
});

export const popup = style({
  boxSizing: 'border-box',
  paddingBlock: sys.spacing[8],
  paddingInline: sys.spacing[10],
  borderRadius: popoverVars.shape.popupCorner,
  backgroundColor: popoverVars.color.popupBackground,
  color: popoverVars.color.triggerForeground,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  inlineSize: 'var(--popup-width, auto)',
  blockSize: 'var(--popup-height, auto)',
  maxInlineSize: '500px',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${popoverVars.color.popupOutlineLight}`,
      boxShadow: popoverVars.color.popupShadow,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${popoverVars.color.popupOutlineDark}`,
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
  fill: popoverVars.color.popupBackground,
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: popoverVars.color.arrowOuterStroke,
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: popoverVars.color.arrowInnerStroke,
    },
  },
});

export const title = style({
  marginBlock: '0',
  marginInline: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontWeight: '500',
});

export const description = style({
  marginBlock: '0',
  marginInline: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: popoverVars.color.popupDescription,
});

export const container = style({
  display: 'flex',
  gap: sys.spacing[4],
  flexWrap: 'wrap',
  justifyContent: 'center',
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
  border: `1px solid ${popoverVars.color.triggerBorder}`,
  borderRadius: popoverVars.shape.triggerCorner,
  backgroundColor: popoverVars.color.triggerBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: popoverVars.color.triggerForeground,
  userSelect: 'none',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: popoverVars.color.triggerHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: popoverVars.color.triggerHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${popoverVars.color.triggerFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const popoverRecipe = recipe({
  base: iconButton,
});
