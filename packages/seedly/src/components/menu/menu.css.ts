import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, typography } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingItemStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const menuVars = createThemeContract({
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
    itemHighlightedForeground: null,
    itemHighlightedBackground: null,
    separator: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
    itemCorner: null,
  },
  size: {
    separatorBlockSize: null,
  },
});

const menuColorDefaults = assignVars(menuVars.color, {
  triggerForeground: sys.color.content.base,
  triggerBackground: sys.color.container.base,
  triggerBorder: sys.color.border.base,
  triggerHoverBackground: sys.color.container.low,
  triggerFocusRing: sys.color.tone.primary,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.border.low,
  popupOutlineDark: sys.color.border.low,
  popupShadow: sys.elevation.moderate,
  itemHighlightedForeground: sys.color.container.base,
  itemHighlightedBackground: sys.color.content.base,
  separator: sys.color.border.high,
  arrowOuterStroke: sys.color.border.low,
  arrowInnerStroke: floatingSurfaceDarkOutlineColor,
});

const menuShapeDefaults = assignVars(menuVars.shape, {
  triggerCorner: sys.shape.corner.medium,
  popupCorner: sys.shape.corner.medium,
  itemCorner: sys.shape.corner.small,
});

const menuSizeDefaults = assignVars(menuVars.size, {
  separatorBlockSize: '1px',
});

const menuItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: menuVars.color.itemHighlightedForeground,
    backgroundColor: menuVars.color.itemHighlightedBackground,
    borderRadius: menuVars.shape.itemCorner,
  }).selectors ?? {};

export const button = style([
  {
    vars: {
      ...menuColorDefaults,
      ...menuShapeDefaults,
      ...menuSizeDefaults,
    },
    selectors: {
      '&[data-popup-open]': {
        backgroundColor: menuVars.color.triggerHoverBackground,
      },
    },
  },
]);

export const buttonIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
  marginInlineEnd: calc.negate(sys.spacing[2]),
});

export const positioner = style({
  ...createFloatingPositionerStyles(),
  vars: {
    ...menuColorDefaults,
    ...menuShapeDefaults,
  },
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    paddingBlock: sys.spacing[2],
    borderRadius: menuVars.shape.popupCorner,
    background: menuVars.color.popupBackground,
    foreground: menuVars.color.triggerForeground,
    outlineLight: menuVars.color.popupOutlineLight,
    outlineDark: menuVars.color.popupOutlineDark,
    shadow: menuVars.color.popupShadow,
  }),
  vars: {
    ...menuColorDefaults,
    ...menuShapeDefaults,
    ...menuSizeDefaults,
  },
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
  createFloatingItemStyles({
    preset: 'menu',
    selectors: {
      ...menuItemHighlightSelectors,
    },
  }),
]);

export const separator = style({
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  blockSize: menuVars.size.separatorBlockSize,
  backgroundColor: menuVars.color.separator,
});
