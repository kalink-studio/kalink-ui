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

export const checkboxGroupVars = createThemeContract({
  color: {
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

export const checkboxGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: sys.spacing[2],
  color: checkboxGroupVars.color.foreground,
  vars: {
    ...assignVars(checkboxGroupVars.color, {
      foreground: sys.color.content.base,
      border: sys.color.border.high,
      checkedBackground: sys.color.content.base,
      checkedForeground: sys.color.container.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(checkboxGroupVars.shape, {
      corner: sys.shape.corner.small,
    }),
  },
});

export const caption = style({
  display: 'block',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
});

export const checkbox = style({
  ...createChoiceControlStyles({
    borderRadius: checkboxGroupVars.shape.corner,
    uncheckedBorderColor: checkboxGroupVars.color.border,
    checkedBackgroundColor: checkboxGroupVars.color.checkedBackground,
    focusRingColor: checkboxGroupVars.color.focusRing,
  }),
});

const checkboxIndicatorStyles = createChoiceIndicatorStyles({
  color: checkboxGroupVars.color.checkedForeground,
});

export const indicator = style({
  ...checkboxIndicatorStyles,
  selectors: checkboxIndicatorStyles.selectors,
});

globalStyle(`${indicator} > svg`, {
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
});
