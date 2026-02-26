import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, typography } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingPopupStyles,
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
  panelCorner: '0.375rem',
  buttonCorner: '0.25rem',
  popupCorner: '0.375rem',
});
export const button = style([
  {
    inlineSize: sys.spacing[12],
    blockSize: sys.spacing[12],
    borderRadius: tooltipVars.shape.buttonCorner,
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
    ...createFloatingPopupStyles({
      paddingBlock: sys.spacing[2],
      paddingInline: sys.spacing[4],
      borderRadius: tooltipVars.shape.popupCorner,
      backgroundColor: tooltipVars.color.popupBackground,
      color: tooltipVars.color.popupForeground,
      lightOutline: tooltipVars.color.popupOutlineLight,
      darkOutline: tooltipVars.color.popupOutlineDark,
      darkOutlineOffset: '-1px',
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
  ...createFloatingArrowPlacementStyles({
    sideTopOffset: calc.negate(sys.spacing[4]),
    sideBottomOffset: calc.negate(sys.spacing[4]),
    sideLeftOffset: calc.negate(sys.spacing[7]),
    sideRightOffset: calc.negate(sys.spacing[7]),
  }),
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
