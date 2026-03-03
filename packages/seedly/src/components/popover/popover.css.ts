import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const popoverVars = createThemeContract({
  color: {
    arrowInnerStroke: null,
    arrowOuterStroke: null,

    descriptionForeground: null,

    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupOutlineInverse: null,
    popupShadow: null,

    triggerOpenBackground: null,
  },

  layout: {
    popupMaxInlineSize: null,
  },

  shape: {
    popupCorner: null,
  },

  spacing: {
    popupPaddingBlock: null,
    popupPaddingInline: null,
  },
});

const popoverDefaults = assignVars(popoverVars, {
  color: {
    arrowInnerStroke: floatingSurfaceDarkOutlineColor,
    arrowOuterStroke: sys.color.border.low,
    descriptionForeground: stateColor.mutedContent,
    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupOutlineInverse: 'transparent',
    popupShadow: sys.elevation.moderate,
    triggerOpenBackground: sys.color.container.low,
  },
  layout: {
    popupMaxInlineSize: '500px',
  },
  shape: {
    popupCorner: sys.shape.corner.rounded,
  },
  spacing: {
    popupPaddingBlock: sys.spacing[6],
    popupPaddingInline: sys.spacing[8],
  },
});

export const iconButton = style([
  {
    vars: {
      ...popoverDefaults,
    },
    selectors: {
      '&[data-popup-open]': {
        backgroundColor: popoverVars.color.triggerOpenBackground,
      },
    },
  },
]);
export const positioner = style({
  ...createFloatingPositionerStyles({
    zIndex: '1',
  }),
  inlineSize: 'var(--positioner-width)',
  blockSize: 'var(--positioner-height)',
  maxInlineSize: 'var(--available-width)',
  vars: {
    ...popoverDefaults,
  },
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    paddingBlock: popoverVars.spacing.popupPaddingBlock,
    paddingInline: popoverVars.spacing.popupPaddingInline,
    borderRadius: popoverVars.shape.popupCorner,
    background: popoverVars.color.popupBackground,
    foreground: popoverVars.color.popupForeground,
    inlineSize: 'var(--popup-width, auto)',
    blockSize: 'var(--popup-height, auto)',
    maxInlineSize: popoverVars.layout.popupMaxInlineSize,
    outline: popoverVars.color.popupOutline,
    outlineInverse: popoverVars.color.popupOutlineInverse,
    shadow: popoverVars.color.popupShadow,
  }),
});

export const arrow = style({
  ...createFloatingArrowPlacementStyles(),
});

export const arrowFill = style({
  ...createArrowFillStyles(popoverVars.color.popupBackground),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(popoverVars.color.arrowOuterStroke),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(popoverVars.color.arrowInnerStroke),
});

export const title = style([
  typography.title.medium,
  {
    marginBlock: '0',
    marginInline: '0',
  },
]);

export const description = style([
  typography.body.large,
  {
    marginBlock: '0',
    marginInline: '0',
    color: popoverVars.color.descriptionForeground,
  },
]);
