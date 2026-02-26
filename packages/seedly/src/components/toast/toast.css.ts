import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, typography } from '../../styles';

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
  buttonBorder: sys.color.border.base,
  buttonHoverBackground: sys.color.container.low,
  buttonFocusRing: sys.color.tone.primary,
  toastForeground: sys.color.content.base,
  toastBackground: sys.color.container.base,
  toastBorder: sys.color.border.base,
  toastShadow: sys.elevation.low,
  closeHoverBackground: sys.color.container.low,
});

const toastShapeDefaults = assignVars(toastVars.shape, {
  buttonCorner: '0.375rem',
  toastCorner: '0.5rem',
  closeCorner: '0.25rem',
});
export const viewport = style({
  inlineSize: '250px',
  marginBlock: '0',
  marginInline: 'auto',
  position: 'fixed',
  insetBlockEnd: sys.spacing[8],
  insetInlineEnd: sys.spacing[8],
  insetInlineStart: 'auto',
  insetBlockStart: 'auto',
  zIndex: '1',
  '@media': {
    '(min-width: 500px)': {
      inlineSize: '300px',
      insetBlockEnd: sys.spacing[12],
      insetInlineEnd: sys.spacing[12],
    },
  },
});

export const toast = style({
  inlineSize: '100%',
  blockSize: 'var(--height)',
  marginBlock: '0',
  marginInline: 'auto',
  marginInlineEnd: '0',
  paddingBlock: sys.spacing[8],
  paddingInline: sys.spacing[8],
  position: 'absolute',
  insetBlockEnd: '0',
  insetInlineStart: 'auto',
  insetInlineEnd: '0',
  zIndex: 'calc(1000 - var(--toast-index))',
  color: toastVars.color.toastForeground,
  background: toastVars.color.toastBackground,
  border: `1px solid ${toastVars.color.toastBorder}`,
  backgroundClip: 'padding-box',
  borderRadius: toastVars.shape.toastCorner,
  boxShadow: toastVars.color.toastShadow,
  transformOrigin: 'bottom center',
  transform:
    'translateX(var(--toast-swipe-movement-x))\n    translateY(\n      calc(\n        var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) -\n          (var(--shrink) * var(--height))\n      )\n    )\n    scale(var(--scale))',
  transition: `transform ${sys.motion.duration.long[3]} ${sys.motion.easing.decelerate.emphasized}, opacity ${sys.motion.duration.long[3]}, block-size ${sys.motion.duration.short[4]}`,
  cursor: 'default',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  vars: {
    ...toastColorDefaults,
    ...toastShapeDefaults,
    '--gap': sys.spacing[6],
    '--peek': sys.spacing[6],
    '--scale': 'calc(max(0, 1 - (var(--toast-index) * 0.1)))',
    '--shrink': 'calc(1 - var(--scale))',
    '--height': 'var(--toast-frontmost-height, var(--toast-height))',
    '--offset-y':
      'calc(\n    var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) +\n      var(--toast-swipe-movement-y)\n  )',
  },

  selectors: {
    [`&[data-expanded]`]: {
      blockSize: 'var(--toast-height)',
      transform:
        'translateX(var(--toast-swipe-movement-x)) translateY(var(--offset-y))',
    },
    [`&[data-starting-style]`]: {
      transform: 'translateY(150%)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'translateY(150%)',
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
      inlineSize: '100%',
      blockSize: calc.add('var(--gap)', '1px'),
      position: 'absolute',
      insetBlockStart: '100%',
      insetInlineStart: '0',
      content: "''",
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

export const title = style([
  typography.title.small,
  {
    marginBlock: '0',
    marginInline: '0',
  },
]);

export const description = style([
  typography.body.medium,
  {
    marginBlock: '0',
    marginInline: '0',
  },
]);

export const close = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: sys.spacing[9],
  blockSize: sys.spacing[9],
  paddingBlock: '0',
  paddingInline: '0',
  position: 'absolute',
  insetBlockStart: sys.spacing[4],
  insetInlineEnd: sys.spacing[4],
  background: 'transparent',
  border: 'none',
  borderRadius: toastVars.shape.closeCorner,

  selectors: {
    [`&:hover`]: {
      backgroundColor: toastVars.color.closeHoverBackground,
    },
  },
});
