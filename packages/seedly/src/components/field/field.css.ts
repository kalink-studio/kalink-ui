import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFieldLabelStyles,
  createFieldStackStyles,
  createTextInputStyles,
} from '../_foundation';

export const fieldVars = createThemeContract({
  color: {
    label: null,
    foreground: null,
    border: null,
    focusRing: null,
    error: null,
    description: null,
  },
  shape: {
    corner: null,
  },
});

export const field = style({
  ...createFieldStackStyles({
    alignItems: 'start',
    inlineSize: '100%',
  }),
  vars: {
    ...assignVars(fieldVars.color, {
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.border.base,
      focusRing: sys.color.tone.primary,
      error: sys.color.tone.error,
      description: stateColor.mutedContent,
    }),
    ...assignVars(fieldVars.shape, {
      corner: sys.shape.corner.medium,
    }),
  },
});

export const label = style({
  ...createFieldLabelStyles({
    color: fieldVars.color.label,
  }),
});

export const input = style([
  typography.body.large,
  {
    ...createTextInputStyles({
      border: `1px solid ${fieldVars.color.border}`,
      borderRadius: fieldVars.shape.corner,
      backgroundColor: sys.color.surface.base,
      color: fieldVars.color.foreground,
      focus: {
        outlineColor: fieldVars.color.focusRing,
      },
    }),
  },
]);

export const error = style([
  typography.body.medium,
  {
    color: fieldVars.color.error,
  },
]);

export const description = style([
  typography.body.medium,
  {
    marginBlock: '0',
    marginInline: '0',
    color: fieldVars.color.description,
  },
]);
