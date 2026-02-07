import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const progressVars = createThemeContract({
  color: {
    foreground: null,
    track: null,
    indicator: null,
  },
  shape: {
    trackCorner: null,
  },
});

export const progress = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '0.25rem',
  gridRowGap: '0.5rem',
  width: '12rem',
  vars: {
    ...assignVars(progressVars.color, {
      foreground: sys.color.content.base,
      track: sys.color.container.high,
      indicator: stateColor.disabledContent,
    }),
    ...assignVars(progressVars.shape, {
      trackCorner: '0.25rem',
    }),
  },
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: progressVars.color.foreground,
});

export const value = style({
  gridColumnStart: '2',
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: progressVars.color.foreground,
  textAlign: 'right',
});

export const track = style({
  gridColumn: '1 / 3',
  overflow: 'hidden',
  backgroundColor: progressVars.color.track,
  boxShadow: `inset 0 0 0 1px ${progressVars.color.track}`,
  height: '0.25rem',
  borderRadius: progressVars.shape.trackCorner,
});

export const indicator = style({
  display: 'block',
  backgroundColor: progressVars.color.indicator,
  transition: 'width 500ms',
});

export const progressRecipe = recipe({
  base: progress,
});
