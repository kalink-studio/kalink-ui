import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, typography } from '../../styles';
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
  },

  spacing: {
    itemHighlightInsetInline: null,
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
    popupOutlineInverse: sys.color.border.low,
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
  },

  spacing: {
    itemHighlightInsetInline: sys.spacing[4],
    popupPaddingBlock: sys.spacing[2],
    separatorMarginBlock: sys.spacing[3],
    separatorMarginInline: sys.spacing[8],
    triggerIconMarginInlineEnd: sys.spacing[2],
  },
});

export const button = style([
  {
    vars: {
      ...menuDefaults,
    },

    selectors: {
      '&[data-popup-open]': {
        backgroundColor: menuVars.color.triggerOpenBackground,
      },
    },
  },
]);

export const buttonIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
  marginInlineEnd: calc.negate(menuVars.spacing.triggerIconMarginInlineEnd),
});

export const positioner = style({
  ...createFloatingPositionerStyles({
    vars: {
      ...menuDefaults,
    },
  }),
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    background: menuVars.color.popupBackground,
    borderRadius: menuVars.shape.popupCorner,
    foreground: menuVars.color.popupForeground,
    outline: menuVars.color.popupOutline,
    outlineInverse: menuVars.color.popupOutlineInverse,
    paddingBlock: menuVars.spacing.popupPaddingBlock,
    shadow: menuVars.color.popupShadow,
  }),
});

export const arrow = style({
  ...createFloatingArrowPlacementStyles(),
});

export const arrowFill = style({
  ...createArrowFillStyles(menuVars.color.popupBackground),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(menuVars.color.arrowOuterStroke),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(menuVars.color.arrowInnerStroke),
});

export const item = style([
  typography.label.medium,
  createFloatingHighlightedItemStyles({
    preset: 'menu',
    highlight: {
      backgroundColor: menuVars.color.itemHighlightedBackground,
      borderRadius: menuVars.shape.itemHighlightCorner,
      insetInline: menuVars.spacing.itemHighlightInsetInline,
      textColor: menuVars.color.itemHighlightedForeground,
    },
  }),
]);

export const separator = style({
  blockSize: menuVars.size.separatorBlockSize,

  marginBlock: menuVars.spacing.separatorMarginBlock,
  marginInline: menuVars.spacing.separatorMarginInline,

  backgroundColor: menuVars.color.separator,
});
