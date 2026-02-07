import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
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
  height: '2.5rem',
  padding: '0 0.875rem',
  margin: '0',
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
});
globalStyle(`${button}[data-color='red']`, {
  color: alertDialogVars.color.triggerDestructiveForeground,
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: alertDialogVars.color.triggerHoverBackground,
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: alertDialogVars.color.triggerHoverBackground,
});
globalStyle(`${button}:focus-visible`, {
  outline: `2px solid ${alertDialogVars.color.triggerFocusRing}`,
  outlineOffset: '-1px',
});

export const backdrop = style({
  position: 'fixed',
  minHeight: '100dvh',
  inset: '0',
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
});
globalStyle(`${backdrop}[data-starting-style]`, {
  opacity: '0',
});
globalStyle(`${backdrop}[data-ending-style]`, {
  opacity: '0',
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
});
globalStyle(`${popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'translate(-50%, -50%) scale(0.9)',
});
globalStyle(`${popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'translate(-50%, -50%) scale(0.9)',
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
  color: alertDialogVars.color.description,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'end',
  gap: '1rem',
});

export const alertDialogRecipe = recipe({
  base: button,
});
