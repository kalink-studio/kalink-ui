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
    label: null,
    foreground: null,
    border: null,
    checkedBackground: null,
    checkedForeground: null,
    focusRing: null,
  },
  spacing: {
    labelGap: null,
    indicatorSize: null,
  },
  shape: {
    corner: null,
  },
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: checkboxVars.spacing.labelGap,
  color: checkboxVars.color.label,
  vars: {
    ...assignVars(checkboxVars.color, {
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.border.high,
      checkedBackground: sys.color.content.base,
      checkedForeground: sys.color.container.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(checkboxVars.shape, {
      corner: sys.shape.corner.small,
    }),
    ...assignVars(checkboxVars.spacing, {
      labelGap: sys.spacing[4],
      indicatorSize: sys.spacing[6],
    }),
  },
});

export const checkbox = style({
  ...createChoiceControlStyles({
    borderRadius: checkboxVars.shape.corner,
    uncheckedBorderColor: checkboxVars.color.border,
    checkedBackgroundColor: checkboxVars.color.checkedBackground,
    focusRingColor: checkboxVars.color.focusRing,
  }),
});

const checkboxIndicatorStyles = createChoiceIndicatorStyles({
  color: checkboxVars.color.checkedForeground,
});

export const indicator = style({
  ...checkboxIndicatorStyles,
  selectors: checkboxIndicatorStyles.selectors,
});

globalStyle(`${indicator} > svg`, {
  inlineSize: checkboxVars.spacing.indicatorSize,
  blockSize: checkboxVars.spacing.indicatorSize,
});
