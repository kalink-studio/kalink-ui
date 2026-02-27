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
  spacing: {
    groupGap: null,
    itemGap: null,
    indicatorSize: null,
  },
  shape: {
    corner: null,
  },
});

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: radioVars.spacing.groupGap,
  color: radioVars.color.foreground,
  vars: {
    ...assignVars(radioVars.color, {
      foreground: sys.color.content.base,
      border: sys.color.border.high,
      checkedBackground: sys.color.content.base,
      checkedForeground: sys.color.container.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(radioVars.spacing, {
      groupGap: sys.spacing[2],
      itemGap: sys.spacing[4],
      indicatorSize: sys.spacing[4],
    }),
    ...assignVars(radioVars.shape, {
      corner: sys.shape.corner.circle,
    }),
  },
});

export const caption = style({
  display: 'block',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: radioVars.spacing.itemGap,
});

export const radio = style({
  ...createChoiceControlStyles({
    borderRadius: radioVars.shape.corner,
    uncheckedBorderColor: radioVars.color.border,
    checkedBackgroundColor: radioVars.color.checkedBackground,
    focusRingColor: radioVars.color.focusRing,
  }),
});

export const indicator = style({
  ...createChoiceIndicatorStyles({
    alignCenter: true,
    before: {
      size: radioVars.spacing.indicatorSize,
      borderRadius: radioVars.shape.corner,
      backgroundColor: radioVars.color.checkedForeground,
    },
  }),
});
