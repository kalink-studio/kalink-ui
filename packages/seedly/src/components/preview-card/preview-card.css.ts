import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingPopupStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const positioner = style({
  blockSize: 'var(--positioner-height)',
  inlineSize: 'var(--positioner-width)',
  maxInlineSize: 'var(--available-width)',
});

export const popup = style({
  ...createFloatingPopupStyles({
    borderRadius: '0.5rem',
    backgroundColor: sys.color.surface.base,
    color: sys.color.content.base,
    inlineSize: 'var(--popup-width, auto)',
    blockSize: 'var(--popup-height, auto)',
    maxInlineSize: 'min(var(--available-width), 22rem)',
    lightOutline: sys.color.border.low,
    darkOutline: sys.color.border.low,
    darkOutlineOffset: '-1px',
    shadow: sys.elevation.moderate,
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
  ...createArrowFillStyles(sys.color.surface.base),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(sys.color.border.low),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(floatingSurfaceDarkOutlineColor),
});

export const link = style({
  textDecorationLine: 'none',
  textDecorationThickness: '1px',
  textDecorationColor: `color-mix(in oklab, ${sys.color.tone.primary}, transparent 40%)`,
  textUnderlineOffset: '2px',
  color: sys.color.tone.primary,
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
      textDecorationLine: 'none',
      borderRadius: '0.125rem',
      outline: `2px solid ${sys.color.tone.primary}`,
    },
  },
});
