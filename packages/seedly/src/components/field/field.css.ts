import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: sys.spacing[2],
  inlineSize: '100%',
  maxInlineSize: '16rem',
  vars: {
    ...assignVars(fieldVars.color, {
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.container.high,
      focusRing: sys.color.tone.primary,
      error: sys.color.tone.destructive,
      description: stateColor.mutedContent,
    }),
    ...assignVars(fieldVars.shape, {
      corner: '0.375rem',
    }),
  },
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: fieldVars.color.label,
});

export const input = style({
  boxSizing: 'border-box',
  paddingInlineStart: sys.spacing[7],
  marginBlock: '0',
  marginInline: '0',
  border: `1px solid ${fieldVars.color.border}`,
  inlineSize: '100%',
  blockSize: sys.spacing[14],
  borderRadius: fieldVars.shape.corner,
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  color: fieldVars.color.foreground,

  selectors: {
    [`&:focus`]: {
      outline: `2px solid ${fieldVars.color.focusRing}`,
      outlineOffset: '-1px',
    },
  },
});

export const error = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: fieldVars.color.error,
});

export const description = style({
  marginBlock: '0',
  marginInline: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: fieldVars.color.description,
});

export const fieldRecipe = recipe({
  base: field,
});
