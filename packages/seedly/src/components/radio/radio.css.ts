import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import {
  createChoiceControlStyles,
  createChoiceIndicatorStyles,
} from '../_foundation';

export const radioVars = createThemeContract({
  color: {
    foreground: null,
    border: null,
    checkedBackground: null,
    checkedForeground: null,
    focusRing: null,
  },
});

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: sys.spacing[2],
  color: radioVars.color.foreground,
  vars: assignVars(radioVars.color, {
    foreground: sys.color.content.base,
    border: sys.color.border.high,
    checkedBackground: sys.color.content.base,
    checkedForeground: sys.color.container.base,
    focusRing: sys.color.tone.primary,
  }),
});

export const caption = style({
  display: 'block',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
});

export const radio = style({
  ...createChoiceControlStyles({
    borderRadius: sys.shape.corner.circle,
    uncheckedBorderColor: radioVars.color.border,
    checkedBackgroundColor: radioVars.color.checkedBackground,
    focusRingColor: radioVars.color.focusRing,
  }),
});

export const indicator = style({
  ...createChoiceIndicatorStyles({
    alignCenter: true,
    before: {
      size: sys.spacing[4],
      borderRadius: sys.shape.corner.circle,
      backgroundColor: radioVars.color.checkedForeground,
    },
  }),
});
