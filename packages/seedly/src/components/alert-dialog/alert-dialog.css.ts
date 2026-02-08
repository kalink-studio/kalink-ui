import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const alertDialogVars = createThemeContract({
  color: {
    triggerForeground: null,
    triggerDestructiveForeground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerHoverBackground: null,
    triggerFocusRing: null,
    backdrop: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    description: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
  },
});

const alertDialogColorDefaults = assignVars(alertDialogVars.color, {
  triggerForeground: sys.color.content.base,
  triggerDestructiveForeground: sys.color.tone.destructive,
  triggerBackground: sys.color.container.base,
  triggerBorder: sys.color.container.high,
  triggerHoverBackground: sys.color.container.low,
  triggerFocusRing: sys.color.tone.primary,
  backdrop: sys.color.content.base,
  popupBackground: sys.color.container.base,
  popupForeground: sys.color.content.base,
  popupOutline: sys.color.container.top,
  description: stateColor.mutedContent,
});

const alertDialogShapeDefaults = assignVars(alertDialogVars.shape, {
  triggerCorner: '0.375rem',
  popupCorner: '0.5rem',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: sys.spacing[14],
  paddingBlock: '0',
  paddingInline: sys.spacing[7],
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  border: `1px solid ${alertDialogVars.color.triggerBorder}`,
  borderRadius: alertDialogVars.shape.triggerCorner,
  backgroundColor: alertDialogVars.color.triggerBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: alertDialogVars.color.triggerForeground,
  userSelect: 'none',
  vars: {
    ...alertDialogColorDefaults,
    ...alertDialogShapeDefaults,
  },

  selectors: {
    [`&[data-color='red']`]: {
      color: alertDialogVars.color.triggerDestructiveForeground,
    },
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: alertDialogVars.color.triggerHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: alertDialogVars.color.triggerHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${alertDialogVars.color.triggerFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const backdrop = style({
  position: 'fixed',
  minBlockSize: '100dvh',
  insetBlock: '0',
  insetInline: '0',
  backgroundColor: alertDialogVars.color.backdrop,
  opacity: '0.2',
  transition: 'opacity 150ms',
  '@supports': {
    '(-webkit-touch-callout: none)': {
      position: 'absolute',
    },
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      opacity: '0.7',
    },
  },
  vars: {
    ...alertDialogColorDefaults,
    ...alertDialogShapeDefaults,
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
    },
  },
});

export const popup = style({
  boxSizing: 'border-box',
  position: 'fixed',
  insetBlockStart: '50%',
  insetInlineStart: '50%',
  transform: 'translate(-50%, -50%)',
  inlineSize: '24rem',
  maxInlineSize: calc.subtract('100vw', sys.spacing[15]),
  marginBlockStart: calc.negate(sys.spacing[12]),
  paddingBlock: sys.spacing[10],
  paddingInline: sys.spacing[10],
  borderRadius: alertDialogVars.shape.popupCorner,
  outline: `1px solid ${alertDialogVars.color.popupOutline}`,
  backgroundColor: alertDialogVars.color.popupBackground,
  color: alertDialogVars.color.popupForeground,
  transition: 'all 150ms',
  '@media': {
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${alertDialogVars.color.popupOutline}`,
    },
  },
  vars: {
    ...alertDialogColorDefaults,
    ...alertDialogShapeDefaults,
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'translate(-50%, -50%) scale(0.9)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'translate(-50%, -50%) scale(0.9)',
    },
  },
});

export const title = style({
  marginBlockStart: calc.negate(sys.spacing[3]),
  marginBlockEnd: sys.spacing[2],
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  letterSpacing: '-0.0025em',
  fontWeight: '500',
});

export const description = style({
  marginBlock: `0 ${sys.spacing[10]}`,
  marginInline: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: alertDialogVars.color.description,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'end',
  gap: sys.spacing[8],
});

export const alertDialogRecipe = recipe({
  base: button,
});
