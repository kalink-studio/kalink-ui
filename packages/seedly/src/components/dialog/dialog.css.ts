import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const dialogVars = createThemeContract({
  color: {
    triggerForeground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerHoverBackground: null,
    triggerFocusRing: null,
    backdrop: null,
    popupBackground: null,
    popupForeground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    description: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
  },
});

const dialogColorDefaults = assignVars(dialogVars.color, {
  triggerForeground: sys.color.content.base,
  triggerBackground: sys.color.container.base,
  triggerBorder: sys.color.container.high,
  triggerHoverBackground: sys.color.container.low,
  triggerFocusRing: sys.color.tone.primary,
  backdrop: sys.color.content.base,
  popupBackground: sys.color.container.base,
  popupForeground: sys.color.content.base,
  popupOutlineLight: sys.color.container.high,
  popupOutlineDark: sys.color.container.top,
  description: stateColor.mutedContent,
});

const dialogShapeDefaults = assignVars(dialogVars.shape, {
  triggerCorner: '0.375rem',
  popupCorner: '0.5rem',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2.5rem',
  padding: '0 0.875rem',
  margin: '0',
  outline: '0',
  border: `1px solid ${dialogVars.color.triggerBorder}`,
  borderRadius: dialogVars.shape.triggerCorner,
  backgroundColor: dialogVars.color.triggerBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: dialogVars.color.triggerForeground,
  userSelect: 'none',
  vars: {
    ...dialogColorDefaults,
    ...dialogShapeDefaults,
  },

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: dialogVars.color.triggerHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: dialogVars.color.triggerHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${dialogVars.color.triggerFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const backdrop = style({
  position: 'fixed',
  minHeight: '100dvh',
  inset: '0',
  backgroundColor: dialogVars.color.backdrop,
  opacity: '0.2',
  transition: `opacity ${sys.motion.duration.short[4]} ${sys.motion.easing.decelerate.emphasized}`,
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
    ...dialogColorDefaults,
    ...dialogShapeDefaults,
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '24rem',
  maxWidth: 'calc(100vw - 3rem)',
  marginTop: '-2rem',
  padding: '1.5rem',
  borderRadius: dialogVars.shape.popupCorner,
  outline: `1px solid ${dialogVars.color.popupOutlineLight}`,
  backgroundColor: dialogVars.color.popupBackground,
  color: dialogVars.color.popupForeground,
  transition: 'all 150ms',
  '@media': {
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${dialogVars.color.popupOutlineDark}`,
    },
  },
  vars: {
    ...dialogColorDefaults,
    ...dialogShapeDefaults,
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
  marginTop: '-0.375rem',
  marginBottom: '0.25rem',
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  letterSpacing: '-0.0025em',
  fontWeight: '500',
});

export const description = style({
  margin: '0 0 1.5rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: dialogVars.color.description,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'end',
  gap: '1rem',
});

export const dialogRecipe = recipe({
  base: button,
});
