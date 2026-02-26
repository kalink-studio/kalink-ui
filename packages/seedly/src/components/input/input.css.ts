import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createFieldLabelStyles,
  createFieldStackStyles,
  createTextInputStyles,
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
    ...createTextInputStyles({
      border: `1px solid ${inputVars.color.border}`,
      borderRadius: inputVars.shape.corner,
      backgroundColor: sys.color.surface.base,
      color: inputVars.color.foreground,
      focus: {
        outlineColor: inputVars.color.focusRing,
      },
    }),
  },
]);
