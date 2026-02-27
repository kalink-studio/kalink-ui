import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition, typography } from '../../styles';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const progressVars = createThemeContract({
  color: {
    foreground: null,
  },
  spacing: {
    columnGap: null,
    rowGap: null,
  },
  layout: {
    columns: null,
    valueColumnStart: null,
    trackColumn: null,
  },
});

export const progress = style({
  display: 'grid',
  gridTemplateColumns: progressVars.layout.columns,
  columnGap: progressVars.spacing.columnGap,
  rowGap: progressVars.spacing.rowGap,
  inlineSize: '100%',
  vars: {
    ...createRangeTrackRootVars(),
    ...assignVars(progressVars.color, {
      foreground: sys.color.content.base,
    }),
    ...assignVars(progressVars.spacing, {
      columnGap: sys.spacing[2],
      rowGap: sys.spacing[4],
    }),
    ...assignVars(progressVars.layout, {
      columns: '1fr 1fr',
      valueColumnStart: '2',
      trackColumn: '1 / 3',
    }),
  },
});

export const label = style([
  typography.label.medium,
  {
    color: progressVars.color.foreground,
  },
]);

export const value = style([
  typography.body.medium,
  {
    gridColumnStart: progressVars.layout.valueColumnStart,
    marginBlock: '0',
    marginInline: '0',
    color: progressVars.color.foreground,
    textAlign: 'right',
  },
]);

export const track = style({
  gridColumn: progressVars.layout.trackColumn,
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
