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
  triggerCorner: '0.375rem',
  popupCorner: '0.375rem',
  itemCorner: '0.25rem',
});

const menuItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: menuVars.color.itemHighlightedForeground,
    backgroundColor: menuVars.color.itemHighlightedBackground,
    insetInline: sys.spacing[2],
    borderRadius: menuVars.shape.itemCorner,
  }).selectors ?? {};

export const button = style([
  typography.label.large,
  {
    blockSize: sys.spacing[14],
    paddingInline: sys.spacing[7],
    gap: sys.spacing[3],
    vars: {
      ...menuColorDefaults,
      ...menuShapeDefaults,
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
  ...createFloatingPositionerStyles({
    outline: '0',
  }),
  vars: {
    ...menuColorDefaults,
    ...menuShapeDefaults,
  },
});

export const popup = style({
  ...createFloatingPopupStyles({
    paddingBlock: sys.spacing[2],
    borderRadius: menuVars.shape.popupCorner,
    backgroundColor: menuVars.color.popupBackground,
    color: menuVars.color.triggerForeground,
    lightOutline: menuVars.color.popupOutlineLight,
    darkOutline: menuVars.color.popupOutlineDark,
    darkOutlineOffset: '-1px',
    shadow: menuVars.color.popupShadow,
  }),
});

export const arrow = style({
  ...createFloatingArrowPlacementStyles({
    sideTopOffset: calc.negate(sys.spacing[4]),
    sideBottomOffset: calc.negate(sys.spacing[4]),
    sideLeftOffset: calc.negate(sys.spacing[7]),
    sideRightOffset: calc.negate(sys.spacing[7]),
  }),
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
  {
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],
    display: 'flex',

    selectors: {
      ...menuItemHighlightSelectors,
    },
  },
]);

export const separator = style({
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  blockSize: '1px',
  backgroundColor: menuVars.color.separator,
});
