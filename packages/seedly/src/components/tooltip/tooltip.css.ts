import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
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

export const tooltipVars = createThemeContract({
  color: {
    arrowInnerStroke: null,
    arrowOuterStroke: null,

    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupOutlineInverse: null,
    popupShadow: null,

    triggerOpenBackground: null,
  },

  shape: {
    popupCorner: null,
  },

  spacing: {
    popupPaddingBlock: null,
    popupPaddingInline: null,
  },
});

const tooltipDefaults = assignVars(tooltipVars, {
  color: {
    arrowInnerStroke: floatingSurfaceDarkOutlineColor,
    arrowOuterStroke: sys.color.border.low,

    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupOutlineInverse: 'transparent',
    popupShadow: sys.elevation.moderate,

    triggerOpenBackground: sys.color.container.low,
  },
  shape: {
    popupCorner: sys.shape.corner.medium,
  },
  spacing: {
    popupPaddingBlock: sys.spacing[2],
    popupPaddingInline: sys.spacing[4],
  },
});

export const button = style([
  {
    '@layer': {
      [components]: {
        vars: {
          ...tooltipDefaults,
        },
        selectors: {
          '&[data-popup-open]': {
            backgroundColor: tooltipVars.color.triggerOpenBackground,
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
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
      vars: {
        ...tooltipDefaults,
      },
    },
  },
});

export const popup = style([
  typography.body.medium,
  {
    '@layer': {
      [components]: {
        ...createFloatingSurfaceStyles({
          paddingBlock: tooltipVars.spacing.popupPaddingBlock,
          paddingInline: tooltipVars.spacing.popupPaddingInline,
          borderRadius: tooltipVars.shape.popupCorner,
          background: tooltipVars.color.popupBackground,
          foreground: tooltipVars.color.popupForeground,
          outline: tooltipVars.color.popupOutline,
          outlineInverse: tooltipVars.color.popupOutlineInverse,
          shadow: tooltipVars.color.popupShadow,
          selectors: {
            [`&[data-instant]`]: {
              transition: 'none',
            },
          },
        }),
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
]);

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
      ...createArrowFillStyles(tooltipVars.color.popupBackground),
    },
  },
});

export const arrowOuterStroke = style({
  '@layer': {
    [components]: {
      ...createArrowOuterStrokeStyles(tooltipVars.color.arrowOuterStroke),
    },
  },
});

export const arrowInnerStroke = style({
  '@layer': {
    [components]: {
      ...createArrowInnerStrokeStyles(tooltipVars.color.arrowInnerStroke),
    },
  },
});
