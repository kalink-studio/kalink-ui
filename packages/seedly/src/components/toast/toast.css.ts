import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const toastVars = createThemeContract({
  color: {
    buttonForeground: null,
    buttonBackground: null,
    buttonBorder: null,
    buttonHoverBackground: null,
    buttonFocusRing: null,
    toastForeground: null,
    toastBackground: null,
    toastBorder: null,
    toastShadow: null,
    closeHoverBackground: null,
  },
  shape: {
    buttonCorner: null,
    toastCorner: null,
    closeCorner: null,
  },
});

const toastColorDefaults = assignVars(toastVars.color, {
  buttonForeground: sys.color.content.base,
  buttonBackground: sys.color.container.base,
  buttonBorder: sys.color.container.high,
  buttonHoverBackground: sys.color.container.low,
  buttonFocusRing: sys.color.tone.primary,
  toastForeground: sys.color.content.base,
  toastBackground: sys.color.container.base,
  toastBorder: sys.color.container.high,
  toastShadow: sys.elevation.low,
  closeHoverBackground: sys.color.container.low,
});

const toastShapeDefaults = assignVars(toastVars.shape, {
  buttonCorner: '0.375rem',
  toastCorner: '0.5rem',
  closeCorner: '0.25rem',
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
  border: `1px solid ${toastVars.color.buttonBorder}`,
  borderRadius: toastVars.shape.buttonCorner,
  backgroundColor: toastVars.color.buttonBackground,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: toastVars.color.buttonForeground,
  userSelect: 'none',
  vars: {
    ...toastColorDefaults,
    ...toastShapeDefaults,
  },

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: toastVars.color.buttonHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: toastVars.color.buttonHoverBackground,
    },
    [`&:focus-visible`]: {
      outline: `2px solid ${toastVars.color.buttonFocusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const viewport = style({
  position: 'fixed',
  zIndex: '1',
  width: '250px',
  margin: '0 auto',
  bottom: '1rem',
  right: '1rem',
  left: 'auto',
  top: 'auto',
  '@media': {
    '(min-width: 500px)': {
      bottom: '2rem',
      right: '2rem',
      width: '300px',
    },
  },
});

export const toast = style({
  position: 'absolute',
  right: '0',
  margin: '0 auto',
  boxSizing: 'border-box',
  background: toastVars.color.toastBackground,
  color: toastVars.color.toastForeground,
  border: `1px solid ${toastVars.color.toastBorder}`,
  padding: '1rem',
  width: '100%',
  boxShadow: toastVars.color.toastShadow,
  backgroundClip: 'padding-box',
  borderRadius: toastVars.shape.toastCorner,
  transformOrigin: 'bottom center',
  bottom: '0',
  left: 'auto',
  marginRight: '0',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  transition: `transform ${sys.motion.duration.long[3]} ${sys.motion.easing.decelerate.emphasized}, opacity ${sys.motion.duration.long[3]}, height ${sys.motion.duration.short[4]}`,
  cursor: 'default',
  zIndex: 'calc(1000 - var(--toast-index))',
  height: 'var(--height)',
  transform:
    'translateX(var(--toast-swipe-movement-x))\n    translateY(\n      calc(\n        var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) -\n          (var(--shrink) * var(--height))\n      )\n    )\n    scale(var(--scale))',
  vars: {
    ...toastColorDefaults,
    ...toastShapeDefaults,
    '--gap': '0.75rem',
    '--peek': '0.75rem',
    '--scale': 'calc(max(0, 1 - (var(--toast-index) * 0.1)))',
    '--shrink': 'calc(1 - var(--scale))',
    '--height': 'var(--toast-frontmost-height, var(--toast-height))',
    '--offset-y':
      'calc(\n    var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) +\n      var(--toast-swipe-movement-y)\n  )',
  },

  selectors: {
    [`&[data-expanded]`]: {
      transform:
        'translateX(var(--toast-swipe-movement-x)) translateY(var(--offset-y))',
      height: 'var(--toast-height)',
    },
    [`&[data-starting-style]`]: {
      transform: 'translateY(150%)',
    },
    [`&[data-ending-style]`]: {
      transform: 'translateY(150%)',
      opacity: '0',
    },
    [`&[data-limited]`]: {
      opacity: '0',
    },
    [`&[data-ending-style][data-swipe-direction='up']`]: {
      transform: 'translateY(calc(var(--toast-swipe-movement-y) - 150%))',
    },
    [`&[data-ending-style][data-swipe-direction='left']`]: {
      transform:
        'translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(var(--offset-y))',
    },
    [`&[data-ending-style][data-swipe-direction='right']`]: {
      transform:
        'translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(var(--offset-y))',
    },
    [`&[data-ending-style][data-swipe-direction='down']`]: {
      transform: 'translateY(calc(var(--toast-swipe-movement-y) + 150%))',
    },
    [`&::after`]: {
      content: "''",
      position: 'absolute',
      top: '100%',
      width: '100%',
      left: '0',
      height: 'calc(var(--gap) + 1px)',
    },
  },
});

export const content = style({
  overflow: 'hidden',
  transition: 'opacity 0.25s',

  selectors: {
    [`&[data-behind]`]: {
      opacity: '0',
    },
    [`&[data-expanded]`]: {
      opacity: '1',
    },
  },
});

export const title = style({
  fontWeight: '500',
  fontSize: '0.975rem',
  lineHeight: '1.25rem',
  margin: '0',
});

export const description = style({
  fontSize: '0.925rem',
  lineHeight: '1.25rem',
  margin: '0',
});

export const close = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  padding: '0',
  border: 'none',
  background: 'transparent',
  width: '1.25rem',
  height: '1.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: toastVars.shape.closeCorner,

  selectors: {
    [`&:hover`]: {
      backgroundColor: toastVars.color.closeHoverBackground,
    },
  },
});

export const icon = style({
  width: '1rem',
  height: '1rem',
});

export const toastRecipe = recipe({
  base: button,
});
