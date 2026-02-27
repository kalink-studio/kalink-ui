import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
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
    panelBorder: null,
    panelBackground: null,
    buttonForeground: null,
    buttonHoverBackground: null,
    buttonActiveBackground: null,
    focusRing: null,
    popupForeground: null,
    popupBackground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    popupShadow: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
  },
  shape: {
    panelCorner: null,
    buttonCorner: null,
    popupCorner: null,
  },
});

const tooltipColorDefaults = assignVars(tooltipVars.color, {
  panelBorder: sys.color.border.base,
  panelBackground: sys.color.container.base,
  buttonForeground: sys.color.content.base,
  buttonHoverBackground: sys.color.container.low,
  buttonActiveBackground: sys.color.container.high,
  focusRing: sys.color.tone.primary,
  popupForeground: sys.color.content.base,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.border.low,
  popupOutlineDark: sys.color.border.low,
  popupShadow: sys.elevation.moderate,
  arrowOuterStroke: sys.color.border.low,
  arrowInnerStroke: floatingSurfaceDarkOutlineColor,
});

const tooltipShapeDefaults = assignVars(tooltipVars.shape, {
  panelCorner: sys.shape.corner.medium,
  buttonCorner: sys.shape.corner.small,
  popupCorner: sys.shape.corner.medium,
});
export const button = style([
  {
    vars: {
      ...tooltipColorDefaults,
      ...tooltipShapeDefaults,
    },
    selectors: {
      '&[data-popup-open]': {
        backgroundColor: tooltipVars.color.buttonHoverBackground,
      },
      '&:focus-visible': {
        backgroundColor: 'transparent',
      },
    },
  },
]);
export const positioner = style({
  ...createFloatingPositionerStyles(),
  vars: {
    ...tooltipColorDefaults,
    ...tooltipShapeDefaults,
  },
});

export const popup = style([
  typography.body.medium,
  {
    ...createFloatingSurfaceStyles({
      paddingBlock: sys.spacing[2],
      paddingInline: sys.spacing[4],
      borderRadius: tooltipVars.shape.popupCorner,
      background: tooltipVars.color.popupBackground,
      foreground: tooltipVars.color.popupForeground,
      outlineLight: tooltipVars.color.popupOutlineLight,
      outlineDark: tooltipVars.color.popupOutlineDark,
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
]);

export const arrow = style({
  ...createFloatingArrowPlacementStyles(),
});

export const arrowFill = style({
  ...createArrowFillStyles(tooltipVars.color.popupBackground),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(tooltipVars.color.arrowOuterStroke),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(tooltipVars.color.arrowInnerStroke),
});
