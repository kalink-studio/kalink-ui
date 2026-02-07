import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
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
  width: '2.5rem',
  height: '2.5rem',
  padding: '0',
  margin: '0',
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
});
globalStyle(`${iconButton}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: popoverVars.color.triggerHoverBackground,
    },
  },
});
globalStyle(`${iconButton}:active`, {
  backgroundColor: popoverVars.color.triggerHoverBackground,
});
globalStyle(`${iconButton}[data-popup-open]`, {
  backgroundColor: popoverVars.color.triggerHoverBackground,
});
globalStyle(`${iconButton}:focus-visible`, {
  outline: `2px solid ${popoverVars.color.triggerFocusRing}`,
  outlineOffset: '-1px',
});

export const icon = style({
  width: '1.25rem',
  height: '1.25rem',
});

export const positioner = style({
  width: 'var(--positioner-width)',
  height: 'var(--positioner-height)',
  maxWidth: 'var(--available-width)',
  vars: {
    ...popoverColorDefaults,
    ...popoverShapeDefaults,
  },
});

export const popup = style({
  boxSizing: 'border-box',
  padding: '1rem 1.5rem',
  borderRadius: popoverVars.shape.popupCorner,
  backgroundColor: popoverVars.color.popupBackground,
  color: popoverVars.color.triggerForeground,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms,\n    opacity 150ms',
  width: 'var(--popup-width, auto)',
  height: 'var(--popup-height, auto)',
  maxWidth: '500px',
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
});
globalStyle(`${popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});

export const arrow = style({
  display: 'flex',
});
globalStyle(`${arrow}[data-side='top']`, {
  bottom: '-8px',
  rotate: '180deg',
});
globalStyle(`${arrow}[data-side='bottom']`, {
  top: '-8px',
  rotate: '0deg',
});
globalStyle(`${arrow}[data-side='left']`, {
  right: '-13px',
  rotate: '90deg',
});
globalStyle(`${arrow}[data-side='right']`, {
  left: '-13px',
  rotate: '-90deg',
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
  margin: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontWeight: '500',
});

export const description = style({
  margin: '0',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: popoverVars.color.popupDescription,
});

export const container = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const button = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.375rem',
  height: '2.5rem',
  padding: '0 0.875rem',
  margin: '0',
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
});
globalStyle(`${button}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: popoverVars.color.triggerHoverBackground,
    },
  },
});
globalStyle(`${button}:active`, {
  backgroundColor: popoverVars.color.triggerHoverBackground,
});
globalStyle(`${button}:focus-visible`, {
  outline: `2px solid ${popoverVars.color.triggerFocusRing}`,
  outlineOffset: '-1px',
});

export const popoverRecipe = recipe({
  base: iconButton,
});
