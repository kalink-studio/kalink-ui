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
  gap: '0.25rem',
  width: '100%',
  maxWidth: '16rem',
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
  paddingLeft: '0.875rem',
  margin: '0',
  border: `1px solid ${fieldVars.color.border}`,
  width: '100%',
  height: '2.5rem',
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
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: fieldVars.color.description,
});

export const fieldRecipe = recipe({
  base: field,
});
