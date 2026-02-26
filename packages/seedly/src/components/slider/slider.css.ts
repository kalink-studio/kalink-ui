import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const sliderVars = createThemeContract({
  color: {
    thumbBackground: null,
    thumbOutline: null,
    thumbFocusRing: null,
  },
  shape: {
    thumbCorner: null,
  },
});

export const control = style({
  display: 'flex',
  alignItems: 'center',
  inlineSize: '100%',
  paddingBlock: sys.spacing[6],
  touchAction: 'none',
  userSelect: 'none',
  vars: {
    ...createRangeTrackRootVars(),
    ...assignVars(sliderVars.color, {
      thumbBackground: sys.color.surface.bright,
      thumbOutline: sys.color.container.low,
      thumbFocusRing: sys.color.tone.primary,
    }),
    ...assignVars(sliderVars.shape, {
      thumbCorner: '100%',
    }),
  },
});

export const track = style({
  ...createRangeTrackStyles({
    blockSize: sys.spacing[2],
  }),
  inlineSize: '100%',
  userSelect: 'none',
});

export const indicator = style({
  ...createRangeIndicatorStyles(),
  userSelect: 'none',
});

export const thumb = style({
  inlineSize: sys.spacing[8],
  blockSize: sys.spacing[8],
  borderRadius: sliderVars.shape.thumbCorner,
  backgroundColor: sliderVars.color.thumbBackground,
  boxShadow: sys.elevation.minimal,
  outline: `1px solid ${sliderVars.color.thumbOutline}`,
  userSelect: 'none',

  selectors: {
    [`&:has(:focus-visible)`]: {
      outline: `2px solid ${sliderVars.color.thumbFocusRing}`,
    },
  },
});
