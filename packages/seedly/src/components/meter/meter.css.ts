import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const meterVars = createThemeContract({
  color: {
    foreground: null,
    track: null,
    indicator: null,
  },
});

export const meter = style({
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridRowGap: '0.5rem',
  width: '12rem',
  vars: assignVars(meterVars.color, {
    foreground: sys.color.content.base,
    track: sys.color.container.low,
    indicator: stateColor.disabledContent,
  }),
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: meterVars.color.foreground,
});

export const value = style({
  gridColumnStart: '2',
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: meterVars.color.foreground,
  textAlign: 'right',
});

export const track = style({
  gridColumn: '1 / 3',
  overflow: 'hidden',
  backgroundColor: meterVars.color.track,
  boxShadow: `inset 0 0 0 1px ${sys.color.container.high}`,
  height: '0.5rem',
});

export const indicator = style({
  backgroundColor: meterVars.color.indicator,
  transition: 'width 500ms',
});

export const meterRecipe = recipe({
  base: meter,
});
