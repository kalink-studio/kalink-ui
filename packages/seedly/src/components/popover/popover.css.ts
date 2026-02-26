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
    triggerForeground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerHoverBackground: null,
    triggerFocusRing: null,
    popupBackground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    popupShadow: null,
    popupDescription: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
  },
});

const popoverColorDefaults = assignVars(popoverVars.color, {
  triggerForeground: sys.color.content.base,
  triggerBackground: sys.color.container.base,
  triggerBorder: sys.color.border.base,
  triggerHoverBackground: sys.color.container.low,
  triggerFocusRing: sys.color.tone.primary,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.border.low,
  popupOutlineDark: sys.color.border.low,
  popupShadow: sys.elevation.moderate,
  popupDescription: stateColor.mutedContent,
  arrowOuterStroke: sys.color.border.low,
  arrowInnerStroke: floatingSurfaceDarkOutlineColor,
});

const popoverShapeDefaults = assignVars(popoverVars.shape, {
  triggerCorner: sys.shape.corner.medium,
  popupCorner: sys.shape.corner.rounded,
});

export const iconButton = style([
  {
    inlineSize: sys.spacing[14],
    blockSize: sys.spacing[14],
    borderRadius: popoverVars.shape.triggerCorner,
    vars: {
      ...popoverColorDefaults,
      ...popoverShapeDefaults,
    },
    selectors: {
      '&[data-popup-open]': {
        backgroundColor: popoverVars.color.triggerHoverBackground,
      },
    },
  },
]);
export const positioner = style({
  ...createFloatingPositionerStyles(),
  inlineSize: 'var(--positioner-width)',
  blockSize: 'var(--positioner-height)',
  maxInlineSize: 'var(--available-width)',
  vars: {
    ...popoverColorDefaults,
    ...popoverShapeDefaults,
  },
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    paddingBlock: sys.spacing[8],
    paddingInline: sys.spacing[10],
    borderRadius: popoverVars.shape.popupCorner,
    background: popoverVars.color.popupBackground,
    foreground: popoverVars.color.triggerForeground,
    inlineSize: 'var(--popup-width, auto)',
    blockSize: 'var(--popup-height, auto)',
    maxInlineSize: '500px',
    outlineLight: popoverVars.color.popupOutlineLight,
    outlineDark: popoverVars.color.popupOutlineDark,
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
    color: popoverVars.color.popupDescription,
  },
]);
