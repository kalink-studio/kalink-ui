import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition, typography } from '../../styles';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const progressVars = createThemeContract({
  color: {
    indicatorBackground: null,
    rootForeground: null,
    trackBackground: null,
    trackBorder: null,
  },
  layout: {
    rootColumns: null,
    trackColumn: null,
    valueColumnStart: null,
  },
  motion: {
    indicatorWidthDuration: null,
    indicatorWidthEasing: null,
  },
  shape: {
    trackCorner: null,
  },
  size: {
    trackBlockSize: null,
  },
  spacing: {
    rootColumnGap: null,
    rootRowGap: null,
  },
});

const progressDefaults = assignVars(progressVars, {
  color: {
    indicatorBackground: sys.color.content.base,
    rootForeground: sys.color.content.base,
    trackBackground: sys.color.container.base,
    trackBorder: 'transparent',
  },
  layout: {
    rootColumns: '1fr 1fr',
    trackColumn: '1 / 3',
    valueColumnStart: '2',
  },
  motion: {
    indicatorWidthDuration: sys.motion.duration.long[3],
    indicatorWidthEasing: sys.motion.easing.standard,
  },
  shape: {
    trackCorner: sys.shape.corner.sharp,
  },
  size: {
    trackBlockSize: sys.spacing[2],
  },
  spacing: {
    rootColumnGap: sys.spacing[2],
    rootRowGap: sys.spacing[4],
  },
});

export const progress = style({
  vars: {
    ...progressDefaults,
    ...createRangeTrackRootVars({
      trackBackground: progressVars.color.trackBackground,
      trackBorder: progressVars.color.trackBorder,
      indicator: progressVars.color.indicatorBackground,
      corner: progressVars.shape.trackCorner,
    }),
  },

  display: 'grid',
  gridTemplateColumns: progressVars.layout.rootColumns,

  columnGap: progressVars.spacing.rootColumnGap,
  inlineSize: '100%',
  rowGap: progressVars.spacing.rootRowGap,
});

export const label = style([
  typography.label.medium,
  {
    color: progressVars.color.rootForeground,
  },
]);

export const value = style([
  typography.body.medium,
  {
    gridColumnStart: progressVars.layout.valueColumnStart,
    marginBlock: '0',
    marginInline: '0',

    color: progressVars.color.rootForeground,
    textAlign: 'right',
  },
]);

export const track = style({
  gridColumn: progressVars.layout.trackColumn,

  ...createRangeTrackStyles({
    blockSize: progressVars.size.trackBlockSize,
    overflow: 'hidden',
  }),
});

export const indicator = style({
  ...createRangeIndicatorStyles(),

  transition: transition('width', {
    duration: progressVars.motion.indicatorWidthDuration,
    easing: progressVars.motion.indicatorWidthEasing,
  }),
});
