import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';
import { organisms } from '../../styles/layers.css';
import {
  createDialogButtonStyles,
  createDrawerBackdropStyles,
  createDrawerIndentBackgroundStyles,
  createDrawerIndentStyles,
  createDrawerViewportStyles,
} from '../_foundation';

export const drawerVars = createThemeContract({
  color: {
    backdrop: null,
    description: null,
    dragHandle: null,
    indentBackground: null,
    indentBorder: null,
    nestedOverlay: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupOutlineInverse: null,
    popupShadowSide: null,
    popupShadowVertical: null,
  },
  layout: {
    backdropMinBlockSize: null,
    contentInlineSize: null,
    contentMaxInlineSize: null,
    contentMinBlockSize: null,
    indentMinBlockSize: null,
    popupIosMaxInset: null,
    popupSideGap: null,
    popupSideInlineSize: null,
    popupVerticalTopMargin: null,
    viewportPadding: null,
    viewportPaddingIos: null,
  },
  shape: {
    indentCorner: null,
    popupCorner: null,
  },
  size: {
    dragHandleBlockSize: null,
    dragHandleInlineSize: null,
  },
  spacing: {
    actionsGap: null,
    contentGap: null,
    descriptionMarginBlockEnd: null,
    dragHandleMarginBlockEnd: null,
    indentPadding: null,
    indentTranslateY: null,
    popupBleed: null,
    popupPeek: null,
    popupSidePaddingBlock: null,
    popupSidePaddingInline: null,
    popupVerticalPaddingBlockEnd: null,
    popupVerticalPaddingBlockStart: null,
    popupVerticalPaddingInline: null,
    titleMarginBlockEnd: null,
    titleMarginBlockStart: null,
  },
});

const drawerDefaults = assignVars(drawerVars, {
  color: {
    backdrop: 'black',
    description: stateColor.mutedContent,
    dragHandle: sys.color.border.high,
    indentBackground: sys.color.content.base,
    indentBorder: sys.color.border.low,
    nestedOverlay: 'rgb(0 0 0 / 0.05)',
    popupBackground: sys.color.container.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupOutlineInverse: sys.color.border.high,
    popupShadowSide: sys.elevation.moderate,
    popupShadowVertical:
      '0 -16px 48px rgb(0 0 0 / 0.12), 0 6px 18px rgb(0 0 0 / 0.06)',
  },
  layout: {
    backdropMinBlockSize: '100dvh',
    contentInlineSize: '100%',
    contentMaxInlineSize: '32rem',
    contentMinBlockSize: '100%',
    indentMinBlockSize: '320px',
    popupIosMaxInset: '20px',
    popupSideGap: '3rem',
    popupSideInlineSize: '20rem',
    popupVerticalTopMargin: '20vh',
    viewportPadding: '0px',
    viewportPaddingIos: '0.625rem',
  },
  shape: {
    indentCorner: sys.shape.corner.rounded,
    popupCorner: sys.shape.corner.rounded,
  },
  size: {
    dragHandleBlockSize: sys.spacing[1],
    dragHandleInlineSize: sys.spacing[12],
  },
  spacing: {
    actionsGap: sys.spacing[8],
    contentGap: sys.spacing[6],
    descriptionMarginBlockEnd: sys.spacing[10],
    dragHandleMarginBlockEnd: sys.spacing[4],
    indentPadding: sys.spacing[4],
    indentTranslateY: sys.spacing[2],
    popupBleed: '3rem',
    popupPeek: '1rem',
    popupSidePaddingBlock: sys.spacing[6],
    popupSidePaddingInline: sys.spacing[6],
    popupVerticalPaddingBlockEnd: sys.spacing[6],
    popupVerticalPaddingBlockStart: sys.spacing[4],
    popupVerticalPaddingInline: sys.spacing[6],
    titleMarginBlockEnd: sys.spacing[2],
    titleMarginBlockStart: '0',
  },
});

const popupTransition = transition(['transform', 'box-shadow', 'block-size'], {
  duration: sys.motion.duration.long[3],
  easing: sys.motion.easing.decelerate.emphasized,
});

export const button = style({
  '@layer': {
    [organisms]: createDialogButtonStyles({
      vars: drawerDefaults,
    }),
  },
});

export const backdrop = style({
  '@layer': {
    [organisms]: createDrawerBackdropStyles({
      vars: drawerDefaults,
      backdropColor: drawerVars.color.backdrop,
      backdropOpacity: '0.2',
      backdropOpacityDark: '0.7',
      minBlockSize: drawerVars.layout.backdropMinBlockSize,
      transition: transition('opacity', {
        duration: sys.motion.duration.long[3],
        easing: sys.motion.easing.decelerate.emphasized,
      }),
    }),
  },
});

export const viewport = style({
  '@layer': {
    [organisms]: createDrawerViewportStyles({
      vars: drawerDefaults,
      padding: drawerVars.layout.viewportPadding,
      zIndex: '1',
    }),
  },
});

export const popup = style({
  '@layer': {
    [organisms]: {
      vars: {
        ...drawerDefaults,
        '--drawer-stack-progress': 'clamp(0, var(--drawer-swipe-progress), 1)',
        '--drawer-stack-step': '0.05',
        '--drawer-stack-peek-offset': `max(0px, calc((var(--nested-drawers) - var(--drawer-stack-progress)) * ${drawerVars.spacing.popupPeek}))`,
        '--drawer-stack-scale-base':
          'max(0, calc(1 - (var(--nested-drawers) * var(--drawer-stack-step))))',
        '--drawer-stack-scale':
          'clamp(0, calc(var(--drawer-stack-scale-base) + (var(--drawer-stack-step) * var(--drawer-stack-progress))), 1)',
        '--drawer-stack-shrink': 'calc(1 - var(--drawer-stack-scale))',
        '--drawer-stack-height': `max(0px, calc(var(--drawer-frontmost-height, var(--drawer-height)) - ${drawerVars.spacing.popupBleed}))`,
      },

      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',

      color: drawerVars.color.popupForeground,
      backgroundColor: drawerVars.color.popupBackground,
      backgroundClip: 'padding-box',
      outline: `1px solid ${drawerVars.color.popupOutline}`,

      pointerEvents: 'auto',
      transition: popupTransition,
      willChange: 'transform',

      selectors: {
        '&::before': {
          content: "''",
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          transition: transition('background-color', {
            duration: sys.motion.duration.long[3],
            easing: sys.motion.easing.decelerate.emphasized,
          }),
        },
        '&::after': {
          content: "''",
          position: 'absolute',
          backgroundColor: 'inherit',
          pointerEvents: 'none',
          opacity: '0',
        },
        '&[data-swiping]': {
          transitionDuration: '0ms',
          userSelect: 'none',
        },
        '&[data-ending-style]': {
          transitionDuration: 'calc(var(--drawer-swipe-strength) * 400ms)',
        },
        '&[data-swipe-direction="right"]': {
          blockSize: '100%',
          inlineSize: `calc(${drawerVars.layout.popupSideInlineSize} + ${drawerVars.spacing.popupBleed})`,
          maxInlineSize: `calc(100vw - ${drawerVars.layout.popupSideGap} + ${drawerVars.spacing.popupBleed})`,
          marginInlineEnd: `calc(-1 * ${drawerVars.spacing.popupBleed})`,
          paddingBlock: drawerVars.spacing.popupSidePaddingBlock,
          paddingInlineStart: drawerVars.spacing.popupSidePaddingInline,
          paddingInlineEnd: `calc(${drawerVars.spacing.popupSidePaddingInline} + ${drawerVars.spacing.popupBleed})`,
          borderRadius: `${drawerVars.shape.popupCorner} 0 0 ${drawerVars.shape.popupCorner}`,
          boxShadow: drawerVars.color.popupShadowSide,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          touchAction: 'auto',
          transform: 'translateX(var(--drawer-swipe-movement-x))',
        },
        '&[data-swipe-direction="right"][data-starting-style]': {
          transform: `translateX(calc(100% - ${drawerVars.spacing.popupBleed} + ${drawerVars.layout.viewportPadding}))`,
        },
        '&[data-swipe-direction="right"][data-ending-style]': {
          boxShadow: 'none',
          transform: `translateX(calc(100% - ${drawerVars.spacing.popupBleed} + ${drawerVars.layout.viewportPadding}))`,
        },
        '&[data-swipe-direction="left"]': {
          blockSize: '100%',
          inlineSize: `calc(${drawerVars.layout.popupSideInlineSize} + ${drawerVars.spacing.popupBleed})`,
          maxInlineSize: `calc(100vw - ${drawerVars.layout.popupSideGap} + ${drawerVars.spacing.popupBleed})`,
          marginInlineStart: `calc(-1 * ${drawerVars.spacing.popupBleed})`,
          paddingBlock: drawerVars.spacing.popupSidePaddingBlock,
          paddingInlineStart: `calc(${drawerVars.spacing.popupSidePaddingInline} + ${drawerVars.spacing.popupBleed})`,
          paddingInlineEnd: drawerVars.spacing.popupSidePaddingInline,
          borderRadius: `0 ${drawerVars.shape.popupCorner} ${drawerVars.shape.popupCorner} 0`,
          boxShadow: drawerVars.color.popupShadowSide,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          touchAction: 'auto',
          transform: 'translateX(var(--drawer-swipe-movement-x))',
        },
        '&[data-swipe-direction="left"][data-starting-style]': {
          transform: `translateX(calc(-100% + ${drawerVars.spacing.popupBleed} - ${drawerVars.layout.viewportPadding}))`,
        },
        '&[data-swipe-direction="left"][data-ending-style]': {
          boxShadow: 'none',
          transform: `translateX(calc(-100% + ${drawerVars.spacing.popupBleed} - ${drawerVars.layout.viewportPadding}))`,
        },
        '&[data-swipe-direction="down"]': {
          inlineSize: '100%',
          blockSize: 'var(--drawer-height, auto)',
          maxBlockSize: `calc(100dvh - ${drawerVars.layout.popupVerticalTopMargin})`,
          borderRadius: `${drawerVars.shape.popupCorner} ${drawerVars.shape.popupCorner} 0 0`,
          boxShadow: drawerVars.color.popupShadowVertical,
          overflow: 'visible',
          touchAction: 'none',
          transformOrigin: `50% calc(100% - ${drawerVars.spacing.popupBleed})`,
          transform:
            'translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y) - var(--drawer-stack-peek-offset) - (var(--drawer-stack-shrink) * var(--drawer-stack-height)))) scale(var(--drawer-stack-scale))',
        },
        '&[data-swipe-direction="down"]::after': {
          insetInline: '0',
          insetBlockStart: '100%',
          blockSize: drawerVars.spacing.popupBleed,
          opacity: '1',
        },
        '&[data-swipe-direction="down"][data-starting-style]': {
          boxShadow: '0 -16px 48px rgb(0 0 0 / 0), 0 6px 18px rgb(0 0 0 / 0)',
          transform: 'translateY(100%)',
        },
        '&[data-swipe-direction="down"][data-ending-style]': {
          boxShadow: '0 -16px 48px rgb(0 0 0 / 0), 0 6px 18px rgb(0 0 0 / 0)',
          transform: 'translateY(100%)',
        },
        '&[data-swipe-direction="down"][data-nested-drawer-open]': {
          blockSize: `calc(var(--drawer-stack-height) + ${drawerVars.spacing.popupBleed})`,
          overflow: 'hidden',
        },
        '&[data-swipe-direction="down"][data-nested-drawer-open]::before': {
          backgroundColor: drawerVars.color.nestedOverlay,
        },
        '&[data-swipe-direction="up"]': {
          inlineSize: '100%',
          blockSize: 'var(--drawer-height, auto)',
          maxBlockSize: `calc(100dvh - ${drawerVars.layout.popupVerticalTopMargin})`,
          borderRadius: `0 0 ${drawerVars.shape.popupCorner} ${drawerVars.shape.popupCorner}`,
          boxShadow: drawerVars.color.popupShadowVertical,
          overflow: 'visible',
          touchAction: 'none',
          transformOrigin: `50% ${drawerVars.spacing.popupBleed}`,
          transform:
            'translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y) + var(--drawer-stack-peek-offset) + (var(--drawer-stack-shrink) * var(--drawer-stack-height)))) scale(var(--drawer-stack-scale))',
        },
        '&[data-swipe-direction="up"]::after': {
          insetInline: '0',
          insetBlockEnd: '100%',
          blockSize: drawerVars.spacing.popupBleed,
          opacity: '1',
        },
        '&[data-swipe-direction="up"][data-starting-style]': {
          boxShadow: '0 16px 48px rgb(0 0 0 / 0), 0 -6px 18px rgb(0 0 0 / 0)',
          transform: 'translateY(-100%)',
        },
        '&[data-swipe-direction="up"][data-ending-style]': {
          boxShadow: '0 16px 48px rgb(0 0 0 / 0), 0 -6px 18px rgb(0 0 0 / 0)',
          transform: 'translateY(-100%)',
        },
        '&[data-swipe-direction="up"][data-nested-drawer-open]': {
          blockSize: `calc(var(--drawer-stack-height) + ${drawerVars.spacing.popupBleed})`,
          overflow: 'hidden',
        },
        '&[data-swipe-direction="up"][data-nested-drawer-open]::before': {
          backgroundColor: drawerVars.color.nestedOverlay,
        },
      },

      '@supports': {
        '(-webkit-touch-callout: none)': {
          vars: {
            [drawerVars.layout.viewportPadding]:
              drawerVars.layout.viewportPaddingIos,
          },
          selectors: {
            '&[data-swipe-direction="left"]': {
              inlineSize: drawerVars.layout.popupSideInlineSize,
              maxInlineSize: `calc(100vw - ${drawerVars.layout.popupIosMaxInset})`,
              marginInlineStart: '0',
              paddingInlineStart: drawerVars.spacing.popupSidePaddingInline,
              borderRadius: drawerVars.shape.popupCorner,
            },
            '&[data-swipe-direction="right"]': {
              inlineSize: drawerVars.layout.popupSideInlineSize,
              maxInlineSize: `calc(100vw - ${drawerVars.layout.popupIosMaxInset})`,
              marginInlineEnd: '0',
              paddingInlineEnd: drawerVars.spacing.popupSidePaddingInline,
              borderRadius: drawerVars.shape.popupCorner,
            },
          },
        },
      },

      '@media': {
        '(prefers-color-scheme: dark)': {
          outline: `1px solid ${drawerVars.color.popupOutlineInverse}`,
        },
      },
    },
  },
});

export const content = style({
  '@layer': {
    [organisms]: {
      display: 'flex',
      flexDirection: 'column',
      inlineSize: drawerVars.layout.contentInlineSize,
      maxInlineSize: drawerVars.layout.contentMaxInlineSize,
      minBlockSize: drawerVars.layout.contentMinBlockSize,
      marginBlock: '0',
      marginInline: 'auto',
      gap: drawerVars.spacing.contentGap,
      transition: transition('opacity', {
        duration: sys.motion.duration.medium[2],
        easing: sys.motion.easing.decelerate.emphasized,
      }),

      selectors: {
        '[data-swipe-direction="down"] &': {
          flex: '1 1 auto',
          minBlockSize: '0',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          touchAction: 'auto',
          paddingInline: drawerVars.spacing.popupVerticalPaddingInline,
          paddingBlockStart: drawerVars.spacing.popupVerticalPaddingBlockStart,
          paddingBlockEnd: `calc(${drawerVars.spacing.popupVerticalPaddingBlockEnd} + env(safe-area-inset-bottom, 0px))`,
        },
        '[data-swipe-direction="up"] &': {
          flex: '1 1 auto',
          minBlockSize: '0',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          touchAction: 'auto',
          paddingInline: drawerVars.spacing.popupVerticalPaddingInline,
          paddingBlockStart: `calc(${drawerVars.spacing.popupVerticalPaddingBlockStart} + env(safe-area-inset-top, 0px))`,
          paddingBlockEnd: drawerVars.spacing.popupVerticalPaddingBlockEnd,
        },
        '[data-swipe-direction="down"][data-nested-drawer-open] &': {
          opacity: '0',
        },
        '[data-swipe-direction="down"][data-nested-drawer-open][data-nested-drawer-swiping] &':
          {
            opacity: '1',
          },
        '[data-swipe-direction="up"][data-nested-drawer-open] &': {
          opacity: '0',
        },
        '[data-swipe-direction="up"][data-nested-drawer-open][data-nested-drawer-swiping] &':
          {
            opacity: '1',
          },
      },
    },
  },
});

export const title = style({
  '@layer': {
    [organisms]: {
      marginBlockStart: drawerVars.spacing.titleMarginBlockStart,
      marginBlockEnd: drawerVars.spacing.titleMarginBlockEnd,
      marginInline: '0',

      selectors: {
        '[data-swipe-direction="down"] &': {
          textAlign: 'center',
        },
        '[data-swipe-direction="up"] &': {
          textAlign: 'center',
        },
      },
    },
  },
});

export const description = style({
  '@layer': {
    [organisms]: {
      marginBlockStart: '0',
      marginBlockEnd: drawerVars.spacing.descriptionMarginBlockEnd,
      marginInline: '0',
      color: drawerVars.color.description,

      selectors: {
        '[data-swipe-direction="down"] &': {
          textAlign: 'center',
        },
        '[data-swipe-direction="up"] &': {
          textAlign: 'center',
        },
      },
    },
  },
});

export const actions = style({
  '@layer': {
    [organisms]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
      gap: drawerVars.spacing.actionsGap,

      selectors: {
        '[data-swipe-direction="down"] &': {
          justifyContent: 'center',
        },
        '[data-swipe-direction="up"] &': {
          justifyContent: 'center',
        },
      },
    },
  },
});

export const dragArea = style({
  '@layer': {
    [organisms]: {
      flexShrink: '0',
      paddingInline: drawerVars.spacing.popupVerticalPaddingInline,
      paddingBlockStart: drawerVars.spacing.popupVerticalPaddingBlockStart,
      paddingBlockEnd: drawerVars.spacing.popupVerticalPaddingBlockStart,
      borderBlockEnd: `1px solid ${drawerVars.color.popupOutline}`,
      touchAction: 'none',

      selectors: {
        '[data-swipe-direction="up"] &': {
          borderBlockEnd: 'none',
          borderBlockStart: `1px solid ${drawerVars.color.popupOutline}`,
        },
      },

      '@media': {
        '(prefers-color-scheme: dark)': {
          borderColor: drawerVars.color.popupOutlineInverse,
        },
      },
    },
  },
});

export const scrollArea = style({
  '@layer': {
    [organisms]: {
      flex: '1 1 auto',
      minBlockSize: '0',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      touchAction: 'auto',
      paddingInline: drawerVars.spacing.popupVerticalPaddingInline,
      paddingBlockStart: drawerVars.spacing.popupVerticalPaddingBlockStart,
      paddingBlockEnd: `calc(${drawerVars.spacing.popupVerticalPaddingBlockEnd} + env(safe-area-inset-bottom, 0px))`,

      selectors: {
        '[data-swipe-direction="up"] &': {
          paddingBlockStart: `calc(${drawerVars.spacing.popupVerticalPaddingBlockStart} + env(safe-area-inset-top, 0px))`,
          paddingBlockEnd: drawerVars.spacing.popupVerticalPaddingBlockEnd,
        },
      },
    },
  },
});

export const handle = style({
  '@layer': {
    [organisms]: {
      inlineSize: drawerVars.size.dragHandleInlineSize,
      blockSize: drawerVars.size.dragHandleBlockSize,
      marginBlock: `0 ${drawerVars.spacing.dragHandleMarginBlockEnd}`,
      marginInline: 'auto',
      flexShrink: '0',
      borderRadius: '9999px',
      backgroundColor: drawerVars.color.dragHandle,
      transition: transition('opacity', {
        duration: sys.motion.duration.short[4],
        easing: sys.motion.easing.standard,
      }),

      selectors: {
        '[data-swipe-direction="down"][data-nested-drawer-open] &': {
          opacity: '0',
        },
        '[data-swipe-direction="down"][data-nested-drawer-open][data-nested-drawer-swiping] &':
          {
            opacity: '1',
          },
        '[data-swipe-direction="up"][data-nested-drawer-open] &': {
          opacity: '0',
        },
        '[data-swipe-direction="up"][data-nested-drawer-open][data-nested-drawer-swiping] &':
          {
            opacity: '1',
          },
      },
    },
  },
});

export const indent = style({
  '@layer': {
    [organisms]: createDrawerIndentStyles({
      vars: drawerDefaults,
      backgroundColor: drawerVars.color.popupBackground,
      borderColor: drawerVars.color.indentBorder,
      corner: drawerVars.shape.indentCorner,
      minBlockSize: drawerVars.layout.indentMinBlockSize,
      padding: drawerVars.spacing.indentPadding,
      transition:
        'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-radius 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
      translateY: drawerVars.spacing.indentTranslateY,
    }),
  },
});

export const indentBackground = style({
  '@layer': {
    [organisms]: createDrawerIndentBackgroundStyles({
      backgroundColor: drawerVars.color.indentBackground,
    }),
  },
});
