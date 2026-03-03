import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, transition, typography } from '../../styles';
import { components } from '../../styles/layers.css';

export const toastVars = createThemeContract({
  color: {
    closeHoverBackground: null,
    rootBackground: null,
    rootBorder: null,
    rootForeground: null,
    rootShadow: null,
  },
  motion: {
    contentOpacityDuration: null,
    contentOpacityEasing: null,
    rootResizeDuration: null,
    rootResizeEasing: null,
    rootTransformDuration: null,
    rootTransformEasing: null,
  },
  shape: {
    closeCorner: null,
    rootCorner: null,
  },
  layout: {
    viewportInlineSizeDesktop: null,
    viewportInlineSizeMobile: null,
  },
  size: {
    closeSize: null,
  },
  spacing: {
    closeInsetBlockStart: null,
    closeInsetInlineEnd: null,
    rootPaddingBlock: null,
    rootPaddingInline: null,
    stackGap: null,
    stackPeek: null,
    viewportInsetBlockEndDesktop: null,
    viewportInsetBlockEndMobile: null,
    viewportInsetInlineEndDesktop: null,
    viewportInsetInlineEndMobile: null,
  },
});

const toastDefaults = assignVars(toastVars, {
  color: {
    closeHoverBackground: sys.color.container.low,
    rootBackground: sys.color.container.base,
    rootBorder: sys.color.border.base,
    rootForeground: sys.color.content.base,
    rootShadow: sys.elevation.low,
  },
  motion: {
    contentOpacityDuration: sys.motion.duration.medium[2],
    contentOpacityEasing: sys.motion.easing.standard,
    rootResizeDuration: sys.motion.duration.short[4],
    rootResizeEasing: sys.motion.easing.standard,
    rootTransformDuration: sys.motion.duration.long[3],
    rootTransformEasing: sys.motion.easing.decelerate.emphasized,
  },
  shape: {
    closeCorner: sys.shape.corner.small,
    rootCorner: sys.shape.corner.rounded,
  },
  layout: {
    viewportInlineSizeDesktop: '300px',
    viewportInlineSizeMobile: '250px',
  },
  size: {
    closeSize: sys.spacing[9],
  },
  spacing: {
    closeInsetBlockStart: sys.spacing[4],
    closeInsetInlineEnd: sys.spacing[4],
    rootPaddingBlock: sys.spacing[8],
    rootPaddingInline: sys.spacing[8],
    stackGap: sys.spacing[6],
    stackPeek: sys.spacing[6],
    viewportInsetBlockEndDesktop: sys.spacing[12],
    viewportInsetBlockEndMobile: sys.spacing[8],
    viewportInsetInlineEndDesktop: sys.spacing[12],
    viewportInsetInlineEndMobile: sys.spacing[8],
  },
});

export const viewport = style({
  '@layer': {
    [components]: {
      vars: {
        ...toastDefaults,
      },
      inlineSize: toastVars.layout.viewportInlineSizeMobile,
      marginBlock: '0',
      marginInline: 'auto',
      position: 'fixed',
      insetBlockEnd: toastVars.spacing.viewportInsetBlockEndMobile,
      insetInlineEnd: toastVars.spacing.viewportInsetInlineEndMobile,
      insetInlineStart: 'auto',
      insetBlockStart: 'auto',
      zIndex: '1',
      '@media': {
        '(min-width: 500px)': {
          inlineSize: toastVars.layout.viewportInlineSizeDesktop,
          insetBlockEnd: toastVars.spacing.viewportInsetBlockEndDesktop,
          insetInlineEnd: toastVars.spacing.viewportInsetInlineEndDesktop,
        },
      },
    },
  },
});

export const toast = style({
  '@layer': {
    [components]: {
      inlineSize: '100%',
      blockSize: 'var(--height)',
      marginBlock: '0',
      marginInline: 'auto',
      marginInlineEnd: '0',
      paddingBlock: toastVars.spacing.rootPaddingBlock,
      paddingInline: toastVars.spacing.rootPaddingInline,
      position: 'absolute',
      insetBlockEnd: '0',
      insetInlineStart: 'auto',
      insetInlineEnd: '0',
      zIndex: 'calc(1000 - var(--toast-index))',
      color: toastVars.color.rootForeground,
      background: toastVars.color.rootBackground,
      border: `1px solid ${toastVars.color.rootBorder}`,
      backgroundClip: 'padding-box',
      borderRadius: toastVars.shape.rootCorner,
      boxShadow: toastVars.color.rootShadow,
      transformOrigin: 'bottom center',
      transform:
        'translateX(var(--toast-swipe-movement-x))\n    translateY(\n      calc(\n        var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) -\n          (var(--shrink) * var(--height))\n      )\n    )\n    scale(var(--scale))',
      transition: `${transition(['transform', 'opacity'], {
        duration: toastVars.motion.rootTransformDuration,
        easing: toastVars.motion.rootTransformEasing,
      })}, ${transition('block-size', {
        duration: toastVars.motion.rootResizeDuration,
        easing: toastVars.motion.rootResizeEasing,
      })}`,
      cursor: 'default',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      vars: {
        '--gap': toastVars.spacing.stackGap,
        '--peek': toastVars.spacing.stackPeek,
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
    },
  },
});

export const content = style({
  '@layer': {
    [components]: {
      overflow: 'hidden',
      transition: transition('opacity', {
        duration: toastVars.motion.contentOpacityDuration,
        easing: toastVars.motion.contentOpacityEasing,
      }),

      selectors: {
        [`&[data-behind]`]: {
          opacity: '0',
        },
        [`&[data-expanded]`]: {
          opacity: '1',
        },
      },
    },
  },
});

export const title = style([
  typography.title.small,
  {
    '@layer': {
      [components]: {
        marginBlock: '0',
        marginInline: '0',
      },
    },
  },
]);

export const description = style([
  typography.body.medium,
  {
    '@layer': {
      [components]: {
        marginBlock: '0',
        marginInline: '0',
      },
    },
  },
]);

export const close = style({
  '@layer': {
    [components]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      inlineSize: toastVars.size.closeSize,
      blockSize: toastVars.size.closeSize,
      paddingBlock: '0',
      paddingInline: '0',
      position: 'absolute',
      insetBlockStart: toastVars.spacing.closeInsetBlockStart,
      insetInlineEnd: toastVars.spacing.closeInsetInlineEnd,
      background: 'transparent',
      border: 'none',
      borderRadius: toastVars.shape.closeCorner,

      selectors: {
        [`&:hover`]: {
          backgroundColor: toastVars.color.closeHoverBackground,
        },
      },
    },
  },
});
