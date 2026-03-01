import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import {
  createChoiceControlStyles,
  createChoiceIndicatorStyles,
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
    controlCheckedBackground: sys.color.content.base,
    controlFocusRing: sys.color.tone.primary,
    indicatorForeground: sys.color.container.base,
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
  vars: radioDefaults,

  display: 'flex',
  alignItems: 'center',

  gap: radioVars.spacing.labelGap,

  color: radioVars.color.labelForeground,
});

export const radio = style({
  ...createChoiceControlStyles({
    borderRadius: radioVars.shape.controlCorner,
    checkedBackgroundColor: radioVars.color.controlCheckedBackground,
    focusOutlineOffset: radioVars.spacing.controlFocusOutlineOffset,
    focusRingColor: radioVars.color.controlFocusRing,
    size: radioVars.size.controlSize,
    uncheckedBorderColor: radioVars.color.controlBorder,
  }),
});

export const indicator = style({
  ...createChoiceIndicatorStyles({
    alignCenter: true,
    before: {
      size: radioVars.size.indicatorSize,
      borderRadius: radioVars.shape.controlCorner,
      backgroundColor: radioVars.color.indicatorForeground,
    },
  }),
});
