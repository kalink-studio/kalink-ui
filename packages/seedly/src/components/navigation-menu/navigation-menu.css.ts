import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, transition } from '../../styles';
import { organisms } from '../../styles/layers.css';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createDialogBackdropStyles,
  createFloatingArrowPlacementStyles,
  createFloatingPositionerStyles,
  createFloatingSurfaceStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const navigationMenuVars = createThemeContract({
  color: {
    arrowInnerStroke: null,
    arrowOuterStroke: null,
    backdrop: null,
    contentForeground: null,
    linkCardFocusRing: null,
    linkCardHoverBackground: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupShadow: null,
    triggerBackground: null,
    triggerFocusRing: null,
    triggerHoverBackground: null,
    triggerOpenBackground: null,
  },

  layout: {
    backdropMinBlockSize: null,
    contentMinInlineSizeDesktop: null,
    contentMobileInlineSize: null,
  },

  motion: {
    arrowPositionDuration: null,
    arrowPositionEasing: null,
    contentOpacityDuration: null,
    contentOpacityEasing: null,
    contentTransformDuration: null,
    contentTransformEasing: null,
    iconRotationDuration: null,
    iconRotationEasing: null,
    popupEnterDuration: null,
    popupEnterEasing: null,
    popupExitDuration: null,
    popupExitEasing: null,
    positionerTransitionDuration: null,
    positionerTransitionEasing: null,
  },

  shape: {
    linkCardCorner: null,
    popupCorner: null,
    triggerCorner: null,
  },

  size: {
    triggerBlockSize: null,
  },

  spacing: {
    contentPaddingBlock: null,
    contentPaddingInline: null,
    floatingPointerSize: null,
    linkCardPaddingBlock: null,
    linkCardPaddingBlockDesktop: null,
    linkCardPaddingInline: null,
    linkCardPaddingInlineDesktop: null,
    triggerGap: null,
    triggerPaddingInline: null,
    triggerPaddingInlineMobile: null,
  },

  typography: {
    triggerMobileLineHeight: null,
    triggerMobileSize: null,
  },
});

const navigationMenuDefaults = assignVars(navigationMenuVars, {
  color: {
    arrowInnerStroke: floatingSurfaceDarkOutlineColor,
    arrowOuterStroke: sys.color.border.low,
    backdrop: sys.color.content.base,
    contentForeground: sys.color.content.base,
    linkCardFocusRing: sys.color.tone.primary,
    linkCardHoverBackground: sys.color.container.low,
    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupShadow: sys.elevation.moderate,
    triggerBackground: sys.color.container.base,
    triggerFocusRing: sys.color.tone.primary,
    triggerHoverBackground: sys.color.container.low,
    triggerOpenBackground: sys.color.container.low,
  },

  layout: {
    backdropMinBlockSize: '100dvh',
    contentMinInlineSizeDesktop: sys.layout.measure,
    contentMobileInlineSize: calc.subtract('100vw', sys.spacing[14]),
  },

  motion: {
    arrowPositionDuration: sys.motion.duration.medium[4],
    arrowPositionEasing: sys.motion.easing.decelerate.emphasized,
    contentOpacityDuration: sys.motion.duration.medium[3],
    contentOpacityEasing: sys.motion.easing.decelerate.emphasized,
    contentTransformDuration: sys.motion.duration.medium[3],
    contentTransformEasing: sys.motion.easing.decelerate.emphasized,
    iconRotationDuration: sys.motion.duration.medium[3],
    iconRotationEasing: sys.motion.easing.standard,
    popupEnterDuration: sys.motion.duration.medium[4],
    popupEnterEasing: sys.motion.easing.decelerate.emphasized,
    popupExitDuration: sys.motion.duration.short[4],
    popupExitEasing: sys.motion.easing.standard,
    positionerTransitionDuration: sys.motion.duration.medium[4],
    positionerTransitionEasing: sys.motion.easing.decelerate.emphasized,
  },

  shape: {
    linkCardCorner: sys.shape.corner.medium,
    popupCorner: sys.shape.corner.rounded,
    triggerCorner: sys.shape.corner.medium,
  },

  size: {
    triggerBlockSize: sys.spacing[14],
  },

  spacing: {
    contentPaddingBlock: sys.spacing[10],
    contentPaddingInline: sys.spacing[10],
    floatingPointerSize: sys.spacing[5],
    linkCardPaddingBlock: sys.spacing[4],
    linkCardPaddingBlockDesktop: sys.spacing[6],
    linkCardPaddingInline: sys.spacing[4],
    linkCardPaddingInlineDesktop: sys.spacing[6],
    triggerGap: sys.spacing[3],
    triggerPaddingInline: sys.spacing[7],
    triggerPaddingInlineMobile: sys.spacing[4],
  },

  typography: {
    triggerMobileLineHeight: sys.typography.label.medium.lineHeight,
    triggerMobileSize: sys.typography.label.medium.size,
  },
});

export const root = style({
  '@layer': {
    [organisms]: {
      vars: {
        ...navigationMenuDefaults,
      },

      minInlineSize: 'max-content',
    },
  },
});

export const list = style({
  '@layer': {
    [organisms]: {
      position: 'relative',

      display: 'flex',

      listStyle: 'none',
      marginBlock: '0',
      marginInline: '0',
      paddingBlock: '0',
      paddingInline: '0',
    },
  },
});

export const trigger = style({
  '@layer': {
    [organisms]: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',

      blockSize: navigationMenuVars.size.triggerBlockSize,
      gap: navigationMenuVars.spacing.triggerGap,
      marginBlock: '0',
      marginInline: '0',
      paddingInline: navigationMenuVars.spacing.triggerPaddingInline,

      textDecoration: 'none',
      whiteSpace: 'nowrap',

      backgroundColor: navigationMenuVars.color.triggerBackground,
      borderRadius: navigationMenuVars.shape.triggerCorner,
      outline: '0',

      userSelect: 'none',

      selectors: {
        [`&:hover`]: {
          '@media': {
            '(hover: hover)': {
              backgroundColor: navigationMenuVars.color.triggerHoverBackground,
            },
          },
        },

        [`&[data-popup-open]`]: {
          backgroundColor: navigationMenuVars.color.triggerOpenBackground,
        },

        [`&:focus-visible`]: {
          outline: `2px solid ${navigationMenuVars.color.triggerFocusRing}`,
          outlineOffset: '-1px',
          position: 'relative',
        },
      },

      '@media': {
        '(max-width: 500px)': {
          fontSize: navigationMenuVars.typography.triggerMobileSize,
          lineHeight: navigationMenuVars.typography.triggerMobileLineHeight,
          paddingInline: navigationMenuVars.spacing.triggerPaddingInlineMobile,
        },
      },
    },
  },
});

export const icon = style({
  '@layer': {
    [organisms]: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',

      transition: transition('transform', {
        duration: navigationMenuVars.motion.iconRotationDuration,
        easing: navigationMenuVars.motion.iconRotationEasing,
      }),

      selectors: {
        [`&[data-popup-open]`]: {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
});

export const positioner = style({
  '@layer': {
    [organisms]: {
      ...createFloatingPositionerStyles({
        zIndex: '1',
      }),

      vars: {
        ...navigationMenuDefaults,
      },

      blockSize: 'var(--positioner-height)',
      inlineSize: 'var(--positioner-width)',
      maxInlineSize: 'var(--available-width)',

      transition: transition(['top', 'left', 'right', 'bottom'], {
        duration: navigationMenuVars.motion.positionerTransitionDuration,
        easing: navigationMenuVars.motion.positionerTransitionEasing,
      }),

      selectors: {
        [`&::before`]: {
          content: "''",
          position: 'absolute',
        },

        [`&[data-side='top']::before`]: {
          blockSize: navigationMenuVars.spacing.floatingPointerSize,
          bottom: calc.negate(navigationMenuVars.spacing.floatingPointerSize),
          left: '0',
          right: '0',
        },

        [`&[data-side='bottom']::before`]: {
          blockSize: navigationMenuVars.spacing.floatingPointerSize,
          left: '0',
          right: '0',
          top: calc.negate(navigationMenuVars.spacing.floatingPointerSize),
        },

        [`&[data-side='left']::before`]: {
          bottom: '0',
          inlineSize: navigationMenuVars.spacing.floatingPointerSize,
          right: calc.negate(navigationMenuVars.spacing.floatingPointerSize),
          top: '0',
        },

        [`&[data-side='right']::before`]: {
          bottom: '0',
          inlineSize: navigationMenuVars.spacing.floatingPointerSize,
          left: calc.negate(navigationMenuVars.spacing.floatingPointerSize),
          top: '0',
        },

        [`&[data-instant]`]: {
          transition: 'none',
        },
      },
    },
  },
});

export const popup = style({
  '@layer': {
    [organisms]: {
      ...createFloatingSurfaceStyles({
        background: navigationMenuVars.color.popupBackground,
        blockSize: 'var(--popup-height)',
        borderRadius: navigationMenuVars.shape.popupCorner,
        foreground: navigationMenuVars.color.popupForeground,
        inlineSize: 'var(--popup-width)',
        outline: navigationMenuVars.color.popupOutline,
        shadow: navigationMenuVars.color.popupShadow,

        motion: {
          transition: transition(
            ['opacity', 'transform', 'inline-size', 'block-size'],
            {
              duration: navigationMenuVars.motion.popupEnterDuration,
              easing: navigationMenuVars.motion.popupEnterEasing,
            },
          ),

          endingStyle: {
            opacity: '0',
            transform: 'scale(0.9)',
            transition: transition(['opacity', 'transform'], {
              duration: navigationMenuVars.motion.popupExitDuration,
              easing: navigationMenuVars.motion.popupExitEasing,
            }),
          },
        },
      }),

      position: 'relative',
    },
  },
});

export const content = style({
  '@layer': {
    [organisms]: {
      blockSize: '100%',
      inlineSize: navigationMenuVars.layout.contentMobileInlineSize,

      paddingBlock: navigationMenuVars.spacing.contentPaddingBlock,
      paddingInline: navigationMenuVars.spacing.contentPaddingInline,

      color: navigationMenuVars.color.contentForeground,

      transition: `${transition('opacity', {
        duration: navigationMenuVars.motion.contentOpacityDuration,
        easing: navigationMenuVars.motion.contentOpacityEasing,
      })}, ${transition('transform', {
        duration: navigationMenuVars.motion.contentTransformDuration,
        easing: navigationMenuVars.motion.contentTransformEasing,
      })}`,

      selectors: {
        [`&[data-starting-style]`]: {
          opacity: '0',
        },

        [`&[data-ending-style]`]: {
          opacity: '0',
        },

        [`&[data-starting-style][data-activation-direction='left']`]: {
          transform: 'translateX(-50%)',
        },

        [`&[data-starting-style][data-activation-direction='right']`]: {
          transform: 'translateX(50%)',
        },

        [`&[data-ending-style][data-activation-direction='left']`]: {
          transform: 'translateX(50%)',
        },

        [`&[data-ending-style][data-activation-direction='right']`]: {
          transform: 'translateX(-50%)',
        },
      },

      '@media': {
        '(min-width: 500px)': {
          inlineSize: 'max-content',
          minInlineSize: navigationMenuVars.layout.contentMinInlineSizeDesktop,
        },
      },
    },
  },
});

export const backdrop = style({
  '@layer': {
    [organisms]: createDialogBackdropStyles({
      vars: navigationMenuDefaults,

      minBlockSize: navigationMenuVars.layout.backdropMinBlockSize,

      backdropColor: navigationMenuVars.color.backdrop,

      transition: transition('opacity', {
        duration: 'short.4',
        easing: 'decelerate.emphasized',
      }),
    }),
  },
});

export const viewport = style({
  '@layer': {
    [organisms]: {
      position: 'relative',

      blockSize: '100%',
      inlineSize: '100%',
      overflow: 'hidden',
    },
  },
});

export const linkCard = style({
  '@layer': {
    [organisms]: {
      display: 'block',

      textDecoration: 'none',
      whiteSpace: 'wrap',
    },
  },
});

export const arrow = style({
  '@layer': {
    [organisms]: {
      ...createFloatingArrowPlacementStyles(),

      transition: transition('left', {
        duration: navigationMenuVars.motion.arrowPositionDuration,
        easing: navigationMenuVars.motion.arrowPositionEasing,
      }),
    },
  },
});

export const arrowFill = style({
  '@layer': {
    [organisms]: {
      ...createArrowFillStyles(navigationMenuVars.color.popupBackground),
    },
  },
});

export const arrowOuterStroke = style({
  '@layer': {
    [organisms]: {
      ...createArrowOuterStrokeStyles(
        navigationMenuVars.color.arrowOuterStroke,
      ),
    },
  },
});

export const arrowInnerStroke = style({
  '@layer': {
    [organisms]: {
      ...createArrowInnerStrokeStyles(
        navigationMenuVars.color.arrowInnerStroke,
      ),
    },
  },
});
