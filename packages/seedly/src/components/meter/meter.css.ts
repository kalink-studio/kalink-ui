import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition, typography } from '../../styles';
import { molecules } from '../../styles/layers.css';
import {
  createRangeIndicatorStyles,
  createRangeTrackStyles,
} from '../_foundation';

export const meterVars = createThemeContract({
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
    rootRowGap: null,
  },
});

const meterDefaults = assignVars(meterVars, {
  color: {
    indicatorBackground: sys.color.tone.primary,
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
    rootRowGap: sys.spacing[4],
  },
});

export const meter = style({
  '@layer': {
    [molecules]: {
      vars: {
        ...meterDefaults,
      },

      display: 'grid',
      gridTemplateColumns: meterVars.layout.rootColumns,

      inlineSize: '100%',
      rowGap: meterVars.spacing.rootRowGap,
    },
  },
});

export const label = style({
  '@layer': {
    [molecules]: {
      color: meterVars.color.rootForeground,
    },
  },
});

export const value = style([
  typography.body.medium,
  {
    '@layer': {
      [molecules]: {
        gridColumnStart: meterVars.layout.valueColumnStart,
        marginBlock: '0',
        marginInline: '0',

        color: meterVars.color.rootForeground,
        textAlign: 'right',
      },
    },
  },
]);

export const track = style({
  '@layer': {
    [molecules]: {
      gridColumn: meterVars.layout.trackColumn,

      ...createRangeTrackStyles({
        backgroundColor: meterVars.color.trackBackground,
        blockSize: meterVars.size.trackBlockSize,
        borderColor: meterVars.color.trackBorder,
        borderRadius: meterVars.shape.trackCorner,
        overflow: 'hidden',
      }),
    },
  },
});

export const indicator = style({
  '@layer': {
    [molecules]: {
      ...createRangeIndicatorStyles({
        backgroundColor: meterVars.color.indicatorBackground,
        borderRadius: meterVars.shape.trackCorner,
      }),

      transition: transition('width', {
        duration: meterVars.motion.indicatorWidthDuration,
        easing: meterVars.motion.indicatorWidthEasing,
      }),
    },
  },
});
