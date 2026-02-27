import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';

import { sys } from '../../styles';
import {
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
    controlCheckedBackground: sys.color.content.base,
    controlFocusRing: sys.color.tone.primary,
    indicatorForeground: sys.color.container.base,
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
  vars: checkboxDefaults,

  alignItems: 'center',
  display: 'flex',

  gap: checkboxVars.spacing.labelGap,

  color: checkboxVars.color.labelForeground,
});

export const checkbox = style({
  ...createChoiceControlStyles({
    borderRadius: checkboxVars.shape.controlCorner,
    checkedBackgroundColor: checkboxVars.color.controlCheckedBackground,
    focusOutlineOffset: checkboxVars.spacing.controlFocusOutlineOffset,
    focusRingColor: checkboxVars.color.controlFocusRing,
    size: checkboxVars.size.controlSize,
    uncheckedBorderColor: checkboxVars.color.controlBorder,
  }),
});

const checkboxIndicatorStyles = createChoiceIndicatorStyles({
  color: checkboxVars.color.indicatorForeground,
});

export const indicator = style({
  ...checkboxIndicatorStyles,
  selectors: checkboxIndicatorStyles.selectors,
});

globalStyle(`${indicator} > svg`, {
  blockSize: checkboxVars.size.indicatorSize,
  inlineSize: checkboxVars.size.indicatorSize,
});
