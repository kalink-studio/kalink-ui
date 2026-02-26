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
  shape: {
    corner: null,
  },
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
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
      corner: '0.25rem',
    }),
  },
});

export const checkbox = style({
  ...createChoiceControlStyles({
    size: sys.spacing[9],
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
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
});
