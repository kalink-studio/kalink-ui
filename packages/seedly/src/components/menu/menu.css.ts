import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingHighlightedItemStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const menuVars = createThemeContract({
  color: {
    arrowInnerStroke: null,
    arrowOuterStroke: null,

    itemHighlightedBackground: null,
    itemHighlightedForeground: null,

    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupOutlineInverse: null,
    popupShadow: null,

    separator: null,

    triggerOpenBackground: null,
  },

  shape: {
    itemHighlightCorner: null,
    popupCorner: null,
  },

  size: {
    separatorBlockSize: null,
    minInlineSize: null,
  },

  spacing: {
    itemHighlightInsetInline: null,
    itemPaddingBlock: null,
    itemPaddingInline: null,
    popupPaddingBlock: null,
    separatorMarginBlock: null,
    separatorMarginInline: null,
    triggerIconMarginInlineEnd: null,
  },
});

const menuDefaults = assignVars(menuVars, {
  color: {
    arrowInnerStroke: floatingSurfaceDarkOutlineColor,
    arrowOuterStroke: sys.color.border.low,

    itemHighlightedBackground: sys.color.content.base,
    itemHighlightedForeground: sys.color.container.base,

    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupOutlineInverse: 'transparent',
    popupShadow: sys.elevation.moderate,

    separator: sys.color.border.high,

    triggerOpenBackground: sys.color.container.low,
  },

  shape: {
    itemHighlightCorner: sys.shape.corner.small,
    popupCorner: sys.shape.corner.medium,
  },

  size: {
    separatorBlockSize: '1px',
    minInlineSize: calc.divide(sys.layout.measure, 3),
  },

  spacing: {
    itemHighlightInsetInline: sys.spacing[4],
    itemPaddingBlock: sys.spacing[2],
    itemPaddingInline: sys.spacing[8],
    popupPaddingBlock: sys.spacing[2],
    separatorMarginBlock: sys.spacing[3],
    separatorMarginInline: sys.spacing[8],
    triggerIconMarginInlineEnd: sys.spacing[2],
  },
});

export const button = style([
  {
    '@layer': {
      [components]: {
        vars: {
          ...menuDefaults,
        },

        selectors: {
          '&[data-popup-open]': {
            backgroundColor: menuVars.color.triggerOpenBackground,
          },
        },
      },
    },
  },
]);

export const buttonIcon = style({
  '@layer': {
    [components]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      marginInlineEnd: calc.negate(menuVars.spacing.triggerIconMarginInlineEnd),
    },
  },
});

export const positioner = style({
  '@layer': {
    [components]: {
      ...createFloatingPositionerStyles({
        zIndex: '1',
        vars: {
          ...menuDefaults,
        },
      }),
    },
  },
});

export const popup = style({
  '@layer': {
    [components]: {
      ...createFloatingSurfaceStyles({
        background: menuVars.color.popupBackground,
        borderRadius: menuVars.shape.popupCorner,
        foreground: menuVars.color.popupForeground,
        outline: menuVars.color.popupOutline,
        outlineInverse: menuVars.color.popupOutlineInverse,
        paddingBlock: menuVars.spacing.popupPaddingBlock,
        shadow: menuVars.color.popupShadow,
        minInlineSize: menuVars.size.minInlineSize,
      }),
    },
  },
});

export const arrow = style({
  '@layer': {
    [components]: {
      ...createFloatingArrowPlacementStyles(),
    },
  },
});

export const arrowFill = style({
  '@layer': {
    [components]: {
      ...createArrowFillStyles(menuVars.color.popupBackground),
    },
  },
});

export const arrowOuterStroke = style({
  '@layer': {
    [components]: {
      ...createArrowOuterStrokeStyles(menuVars.color.arrowOuterStroke),
    },
  },
});

export const arrowInnerStroke = style({
  '@layer': {
    [components]: {
      ...createArrowInnerStrokeStyles(menuVars.color.arrowInnerStroke),
    },
  },
});

export const item = style([
  typography.body.medium,
  {
    '@layer': {
      [components]: createFloatingHighlightedItemStyles({
        preset: 'menu',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: menuVars.spacing.itemPaddingInline,
        paddingBlock: menuVars.spacing.itemPaddingBlock,
        paddingInline: menuVars.spacing.itemPaddingInline,
        highlight: {
          backgroundColor: menuVars.color.itemHighlightedBackground,
          borderRadius: menuVars.shape.itemHighlightCorner,
          insetInline: menuVars.spacing.itemHighlightInsetInline,
          textColor: menuVars.color.itemHighlightedForeground,
        },
      }),
    },
  },
]);

export const separator = style({
  '@layer': {
    [components]: {
      blockSize: menuVars.size.separatorBlockSize,

      marginBlock: menuVars.spacing.separatorMarginBlock,
      marginInline: menuVars.spacing.separatorMarginInline,

      backgroundColor: menuVars.color.separator,
    },
  },
});
