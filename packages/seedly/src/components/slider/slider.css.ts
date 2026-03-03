import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const sliderVars = createThemeContract({
  color: {
    indicatorBackground: null,
    thumbBackground: null,
    thumbFocusRing: null,
    thumbOutline: null,
    trackBackground: null,
    trackBorder: null,
  },
  shape: {
    thumbCorner: null,
    trackCorner: null,
  },
  size: {
    thumbSize: null,
    trackBlockSize: null,
  },
  spacing: {
    controlPaddingBlock: null,
  },
});

const sliderDefaults = assignVars(sliderVars, {
  color: {
    indicatorBackground: sys.color.content.base,
    thumbBackground: sys.color.surface.bright,
    thumbFocusRing: sys.color.tone.primary,
    thumbOutline: sys.color.container.low,
    trackBackground: sys.color.container.base,
    trackBorder: 'transparent',
  },
  shape: {
    thumbCorner: sys.shape.corner.circle,
    trackCorner: sys.shape.corner.sharp,
  },
  size: {
    thumbSize: sys.spacing[8],
    trackBlockSize: sys.spacing[2],
  },
  spacing: {
    controlPaddingBlock: sys.spacing[6],
  },
});

export const control = style({
  '@layer': {
    [components]: {
      vars: {
        ...sliderDefaults,
        ...createRangeTrackRootVars({
          trackBackground: sliderVars.color.trackBackground,
          trackBorder: sliderVars.color.trackBorder,
          indicator: sliderVars.color.indicatorBackground,
          corner: sliderVars.shape.trackCorner,
        }),
      },

      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      inlineSize: '100%',
      paddingBlock: sliderVars.spacing.controlPaddingBlock,
      touchAction: 'none',
      userSelect: 'none',
    },
  },
});

export const track = style({
  '@layer': {
    [components]: {
      ...createRangeTrackStyles({
        blockSize: sliderVars.size.trackBlockSize,
        overflow: 'hidden',
      }),

      inlineSize: '100%',
      userSelect: 'none',
    },
  },
});

export const indicator = style({
  '@layer': {
    [components]: {
      ...createRangeIndicatorStyles(),
      userSelect: 'none',
    },
  },
});

export const thumb = style({
  '@layer': {
    [components]: {
      position: 'absolute',
      inlineSize: sliderVars.size.thumbSize,
      blockSize: sliderVars.size.thumbSize,
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
    },
  },
});
