import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
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
  width: '14rem',
  paddingBlock: '0.75rem',
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
  width: '100%',
  height: '0.25rem',
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
  width: '1rem',
  height: '1rem',
  borderRadius: sliderVars.shape.thumbCorner,
  backgroundColor: sliderVars.color.thumbBackground,
  outline: `1px solid ${sliderVars.color.thumbOutline}`,
  userSelect: 'none',
});
globalStyle(`${thumb}:has(:focus-visible)`, {
  outline: `2px solid ${sliderVars.color.thumbFocusRing}`,
});

export const sliderRecipe = recipe({
  base: control,
});
