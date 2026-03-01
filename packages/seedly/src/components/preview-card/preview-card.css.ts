import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingSurfaceStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const previewCardVars = createThemeContract({
  color: {
    arrowInnerStroke: null,
    arrowOuterStroke: null,

    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupOutlineInverse: null,
    popupShadow: null,

    triggerFocusRing: null,
    triggerForeground: null,
    triggerUnderline: null,
  },

  layout: {
    popupMaxInlineSize: null,
  },

  shape: {
    popupCorner: null,
    triggerFocusCorner: null,
  },

  spacing: {
    triggerUnderlineOffset: null,
  },
});

const previewCardDefaults = assignVars(previewCardVars, {
  color: {
    arrowInnerStroke: floatingSurfaceDarkOutlineColor,
    arrowOuterStroke: sys.color.border.low,
    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupOutlineInverse: sys.color.border.low,
    popupShadow: sys.elevation.moderate,
    triggerFocusRing: sys.color.tone.primary,
    triggerForeground: sys.color.tone.primary,
    triggerUnderline: `color-mix(in oklab, ${sys.color.tone.primary}, transparent 40%)`,
  },

  layout: {
    popupMaxInlineSize: 'min(var(--available-width), 22rem)',
  },

  shape: {
    popupCorner: sys.shape.corner.rounded,
    triggerFocusCorner: sys.shape.corner.sharp,
  },

  spacing: {
    triggerUnderlineOffset: sys.spacing[1],
  },
});

export const positioner = style({
  vars: {
    ...previewCardDefaults,
  },

  blockSize: 'var(--positioner-height)',
  inlineSize: 'var(--positioner-width)',
  maxInlineSize: 'var(--available-width)',
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    background: previewCardVars.color.popupBackground,
    blockSize: 'var(--popup-height, auto)',
    borderRadius: previewCardVars.shape.popupCorner,
    foreground: previewCardVars.color.popupForeground,
    inlineSize: 'var(--popup-width, auto)',
    maxInlineSize: previewCardVars.layout.popupMaxInlineSize,
    outline: previewCardVars.color.popupOutline,
    outlineInverse: previewCardVars.color.popupOutlineInverse,
    shadow: previewCardVars.color.popupShadow,
  }),
});

export const arrow = style({
  ...createFloatingArrowPlacementStyles(),
});

export const arrowFill = style({
  ...createArrowFillStyles(previewCardVars.color.popupBackground),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(previewCardVars.color.arrowOuterStroke),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(previewCardVars.color.arrowInnerStroke),
});

export const link = style({
  vars: {
    ...previewCardDefaults,
  },

  textDecorationColor: previewCardVars.color.triggerUnderline,
  textDecorationLine: 'none',
  textDecorationThickness: '1px',
  textUnderlineOffset: previewCardVars.spacing.triggerUnderlineOffset,

  color: previewCardVars.color.triggerForeground,
  outline: '0',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          textDecorationLine: 'underline',
        },
      },
    },
    [`&[data-popup-open]`]: {
      textDecorationLine: 'underline',
    },
    [`&:focus-visible`]: {
      borderRadius: previewCardVars.shape.triggerFocusCorner,

      textDecorationLine: 'none',
      outline: `2px solid ${previewCardVars.color.triggerFocusRing}`,
    },
  },
});
