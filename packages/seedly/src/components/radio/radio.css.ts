import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { molecules } from '../../styles/layers.css';
import {
  createChoiceControlStyles,
  createChoiceLabelStyles,
} from '../_foundation';

export const radioVars = createThemeContract({
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

const radioDefaults = assignVars(radioVars, {
  color: {
    controlBorder: sys.color.border.high,
    controlCheckedBackground: sys.color.tone.primary,
    controlFocusRing: sys.color.tone.primary,
    indicatorForeground: sys.color.tone.onPrimary,
    labelForeground: sys.color.content.base,
  },
  shape: {
    controlCorner: sys.shape.corner.circle,
  },
  size: {
    controlSize: sys.spacing[9],
    indicatorSize: sys.spacing[4],
  },
  spacing: {
    controlFocusOutlineOffset: sys.spacing[1],
    labelGap: sys.spacing[4],
  },
});

export const label = style({
  '@layer': {
    [molecules]: {
      vars: radioDefaults,
      ...createChoiceLabelStyles({
        color: radioVars.color.labelForeground,
        gap: radioVars.spacing.labelGap,
      }),
    },
  },
});

export const radio = style({
  '@layer': {
    [molecules]: {
      ...createChoiceControlStyles({
        borderRadius: radioVars.shape.controlCorner,
        checkedBackgroundColor: radioVars.color.controlCheckedBackground,
        focusOutlineOffset: radioVars.spacing.controlFocusOutlineOffset,
        focusRingColor: radioVars.color.controlFocusRing,
        size: radioVars.size.controlSize,
        uncheckedBorderColor: radioVars.color.controlBorder,
        animationType: 'fill-in',
        indicatorSize: radioVars.size.indicatorSize,
        indicatorColor: radioVars.color.indicatorForeground,
      }),
    },
  },
});

export const indicator = style({
  '@layer': {
    [molecules]: {
      display: 'none',
    },
  },
});
