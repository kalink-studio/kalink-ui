import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const sliderVars = createThemeContract({
  color: {
    track: null,
    indicator: null,
    thumbBackground: null,
    thumbOutline: null,
    thumbFocusRing: null,
  },
  shape: {
    trackCorner: null,
    thumbCorner: null,
  },
});

export const control = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  inlineSize: '14rem',
  paddingBlock: sys.spacing[6],
  touchAction: 'none',
  userSelect: 'none',
  vars: {
    ...assignVars(sliderVars.color, {
      track: sys.color.container.high,
      indicator: sys.color.content.base,
      thumbBackground: sys.color.surface.bright,
      thumbOutline: sys.color.container.top,
      thumbFocusRing: sys.color.tone.primary,
    }),
    ...assignVars(sliderVars.shape, {
      trackCorner: '0.25rem',
      thumbCorner: '100%',
    }),
  },
});

export const track = style({
  inlineSize: '100%',
  blockSize: sys.spacing[2],
  backgroundColor: sliderVars.color.track,
  boxShadow: `inset 0 0 0 1px ${sliderVars.color.track}`,
  borderRadius: sliderVars.shape.trackCorner,
  userSelect: 'none',
});

export const indicator = style({
  borderRadius: sliderVars.shape.trackCorner,
  backgroundColor: sliderVars.color.indicator,
  userSelect: 'none',
});

export const thumb = style({
  inlineSize: sys.spacing[8],
  blockSize: sys.spacing[8],
  borderRadius: sliderVars.shape.thumbCorner,
  backgroundColor: sliderVars.color.thumbBackground,
  outline: `1px solid ${sliderVars.color.thumbOutline}`,
  userSelect: 'none',

  selectors: {
    [`&:has(:focus-visible)`]: {
      outline: `2px solid ${sliderVars.color.thumbFocusRing}`,
    },
  },
});

export const sliderRecipe = recipe({
  base: control,
});
