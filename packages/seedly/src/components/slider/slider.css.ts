import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition } from '../../styles';
import { molecules } from '../../styles/layers.css';
import {
  createRangeIndicatorStyles,
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
    indicatorBackground: sys.color.tone.primary,
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
    [molecules]: {
      vars: {
        ...sliderDefaults,
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
    [molecules]: {
      ...createRangeTrackStyles({
        backgroundColor: sliderVars.color.trackBackground,
        blockSize: sliderVars.size.trackBlockSize,
        borderColor: sliderVars.color.trackBorder,
        borderRadius: sliderVars.shape.trackCorner,
        overflow: 'hidden',
      }),

      inlineSize: '100%',
      userSelect: 'none',
    },
  },
});

export const indicator = style({
  '@layer': {
    [molecules]: {
      ...createRangeIndicatorStyles({
        backgroundColor: sliderVars.color.indicatorBackground,
        borderRadius: sliderVars.shape.trackCorner,
      }),
      userSelect: 'none',
    },
  },
});

export const thumb = style({
  '@layer': {
    [molecules]: {
      position: 'absolute',

      inlineSize: sliderVars.size.thumbSize,
      blockSize: sliderVars.size.thumbSize,

      borderRadius: sliderVars.shape.thumbCorner,
      backgroundColor: sliderVars.color.thumbBackground,
      boxShadow: sys.elevation.minimal,
      outline: `1px solid ${sliderVars.color.thumbOutline}`,

      userSelect: 'none',
      cursor: 'grab',

      transition: transition(['box-shadow', 'scale'], {
        duration: 'medium.1',
        easing: 'standard',
      }),

      selectors: {
        [`&:has(:focus-visible)`]: {
          outline: `2px solid ${sliderVars.color.thumbFocusRing}`,
        },

        ['[data-dragging] &']: {
          cursor: 'grabbing',
          boxShadow: sys.elevation.low,
          scale: '1.25',
        },
      },
    },
  },
});
