import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition, typography } from '../../styles';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const meterVars = createThemeContract({
  color: {
    foreground: null,
  },
  spacing: {
    rowGap: null,
  },
  layout: {
    columns: null,
    valueColumnStart: null,
    trackColumn: null,
  },
});

export const meter = style({
  display: 'grid',
  gridTemplateColumns: meterVars.layout.columns,
  rowGap: meterVars.spacing.rowGap,
  inlineSize: '100%',
  vars: {
    ...createRangeTrackRootVars(),
    ...assignVars(meterVars.color, {
      foreground: sys.color.content.base,
    }),
    ...assignVars(meterVars.spacing, {
      rowGap: sys.spacing[4],
    }),
    ...assignVars(meterVars.layout, {
      columns: '1fr 1fr',
      valueColumnStart: '2',
      trackColumn: '1 / 3',
    }),
  },
});

export const label = style([
  typography.label.medium,
  {
    color: meterVars.color.foreground,
  },
]);

export const value = style([
  typography.body.medium,
  {
    gridColumnStart: meterVars.layout.valueColumnStart,
    marginBlock: '0',
    marginInline: '0',
    color: meterVars.color.foreground,
    textAlign: 'right',
  },
]);

export const track = style({
  gridColumn: meterVars.layout.trackColumn,
  ...createRangeTrackStyles({
    overflow: 'hidden',
  }),
});

export const indicator = style({
  ...createRangeIndicatorStyles(),
  transition: transition('width', {
    duration: 'long.3',
    easing: 'standard',
  }),
});
