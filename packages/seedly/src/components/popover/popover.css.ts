import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys } from '../../styles';
import { components } from '../../styles/layers.css';
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
    '@layer': {
      [components]: {
        vars: {
          ...popoverDefaults,
        },
        selectors: {
          '&[data-popup-open]': {
            backgroundColor: popoverVars.color.triggerOpenBackground,
          },
        },
      },
    },
  },
]);
export const positioner = style({
  '@layer': {
    [components]: {
      ...createFloatingPositionerStyles({
        zIndex: '1',
      }),
      inlineSize: 'var(--positioner-width)',
      blockSize: 'var(--positioner-height)',
      maxInlineSize: 'var(--available-width)',
      vars: {
        ...popoverDefaults,
      },
    },
  },
});

export const popup = style({
  '@layer': {
    [components]: {
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
      ...createArrowFillStyles(popoverVars.color.popupBackground),
    },
  },
});

export const arrowOuterStroke = style({
  '@layer': {
    [components]: {
      ...createArrowOuterStrokeStyles(popoverVars.color.arrowOuterStroke),
    },
  },
});

export const arrowInnerStroke = style({
  '@layer': {
    [components]: {
      ...createArrowInnerStrokeStyles(popoverVars.color.arrowInnerStroke),
    },
  },
});

export const title = style({
  '@layer': {
    [components]: {
      marginBlock: '0',
      marginInline: '0',
    },
  },
});

export const description = style({
  '@layer': {
    [components]: {
      marginBlock: '0',
      marginInline: '0',
      color: popoverVars.color.descriptionForeground,
    },
  },
});
