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
    gap: sys.spacing[2],
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
      corner: '0.375rem',
    }),
  },
});

export const input = style([
  typography.body.large,
  {
    ...createTextInputStyles({
      paddingInlineStart: sys.spacing[7],
      border: `1px solid ${inputVars.color.border}`,
      inlineSize: '100%',
      blockSize: sys.spacing[14],
      borderRadius: inputVars.shape.corner,
      backgroundColor: sys.color.surface.base,
      color: inputVars.color.foreground,
      focus: {
        outlineColor: inputVars.color.focusRing,
      },
    }),
  },
]);
