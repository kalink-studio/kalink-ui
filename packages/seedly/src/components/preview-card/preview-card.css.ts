import { style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingSurfaceStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const positioner = style({
  blockSize: 'var(--positioner-height)',
  inlineSize: 'var(--positioner-width)',
  maxInlineSize: 'var(--available-width)',
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    borderRadius: sys.shape.corner.rounded,
    inlineSize: 'var(--popup-width, auto)',
    blockSize: 'var(--popup-height, auto)',
    maxInlineSize: 'min(var(--available-width), 22rem)',
  }),
});

export const arrow = style({
  ...createFloatingArrowPlacementStyles(),
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
  textUnderlineOffset: sys.spacing[1],
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
      borderRadius: sys.shape.corner.sharp,
      outline: `2px solid ${sys.color.tone.primary}`,
    },
  },
});
