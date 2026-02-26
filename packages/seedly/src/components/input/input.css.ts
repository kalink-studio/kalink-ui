import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createFieldTextInputStyles,
  createFieldLabelStyles,
  createFieldStackStyles,
} from '../_foundation';

export const inputVars = createThemeContract({
  color: {
    label: null,
    foreground: null,
    border: null,
    focusRing: null,
  },
  shape: {
    corner: null,
  },
});

export const label = style({
  ...createFieldStackStyles({
    alignItems: 'flex-start',
  }),
  ...createFieldLabelStyles({
    color: inputVars.color.label,
  }),
  vars: {
    ...assignVars(inputVars.color, {
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.border.base,
      focusRing: sys.color.tone.primary,
    }),
    ...assignVars(inputVars.shape, {
      corner: sys.shape.corner.medium,
    }),
  },
});

export const input = style([
  typography.body.large,
  {
    ...createFieldTextInputStyles({
      borderColor: inputVars.color.border,
      borderRadius: inputVars.shape.corner,
      foreground: inputVars.color.foreground,
      focusRingColor: inputVars.color.focusRing,
    }),
  },
]);
