import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';

import { sys } from '../../styles';
import { molecules } from '../../styles/layers.css';
import {
  createChoiceLabelStyles,
  createChoiceControlStyles,
  createChoiceIndicatorStyles,
} from '../_foundation';

export const checkboxVars = createThemeContract({
  color: {
    controlBorder: null,
    controlCheckedBackground: null,
    controlFocusRing: null,
    indicatorForeground: null,
    labelForeground: null,
  },
  shape: {
    controlCorner: null,
  },
  size: {
    controlSize: null,
    indicatorSize: null,
  },
  spacing: {
    controlFocusOutlineOffset: null,
    labelGap: null,
  },
});

const checkboxDefaults = assignVars(checkboxVars, {
  color: {
    controlBorder: sys.color.border.high,
    controlCheckedBackground: sys.color.tone.primary,
    controlFocusRing: sys.color.tone.primary,
    indicatorForeground: sys.color.tone.onPrimary,
    labelForeground: sys.color.content.base,
  },
  shape: {
    controlCorner: sys.shape.corner.small,
  },
  size: {
    controlSize: sys.spacing[9],
    indicatorSize: sys.spacing[6],
  },
  spacing: {
    controlFocusOutlineOffset: sys.spacing[1],
    labelGap: sys.spacing[4],
  },
});

export const label = style({
  '@layer': {
    [molecules]: {
      vars: checkboxDefaults,
      ...createChoiceLabelStyles({
        color: checkboxVars.color.labelForeground,
        gap: checkboxVars.spacing.labelGap,
      }),
    },
  },
});

export const checkbox = style({
  '@layer': {
    [molecules]: {
      ...createChoiceControlStyles({
        borderRadius: checkboxVars.shape.controlCorner,
        checkedBackgroundColor: checkboxVars.color.controlCheckedBackground,
        focusOutlineOffset: checkboxVars.spacing.controlFocusOutlineOffset,
        focusRingColor: checkboxVars.color.controlFocusRing,
        size: checkboxVars.size.controlSize,
        uncheckedBorderColor: checkboxVars.color.controlBorder,
        animationType: 'fill-in',
      }),
    },
  },
});

const checkboxIndicatorStyles = createChoiceIndicatorStyles({
  color: checkboxVars.color.indicatorForeground,
});

export const indicator = style({
  '@layer': {
    [molecules]: {
      ...checkboxIndicatorStyles,
      clipPath: 'inset(0 0 0 0)',
      transition:
        'transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1) 100ms, opacity 250ms ease 100ms, clip-path 250ms cubic-bezier(0.165, 0.84, 0.44, 1) 125ms',
      selectors: {
        ...checkboxIndicatorStyles.selectors,
        '&[data-unchecked]': {
          opacity: 0,
          transform: 'scale(0.8)',
          clipPath: 'inset(0 100% 0 0)',
        },
        '&[data-starting-style]': {
          opacity: 0,
          transform: 'scale(0.8)',
          clipPath: 'inset(0 100% 0 0)',
        },
        '&[data-ending-style]': {
          opacity: 0,
          transform: 'scale(0.8)',
          clipPath: 'inset(0 100% 0 0)',
        },
      },
    },
  },
});

globalStyle(`${indicator} > svg`, {
  '@layer': {
    [molecules]: {
      blockSize: checkboxVars.size.indicatorSize,
      inlineSize: checkboxVars.size.indicatorSize,
    },
  },
});
