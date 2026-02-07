import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const fieldsetVars = createThemeContract({
  color: {
    legendBorder: null,
    legendForeground: null,
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

export const fieldset = style({
  border: '0',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '16rem',
  vars: {
    ...assignVars(fieldsetVars.color, {
      legendBorder: sys.color.container.high,
      legendForeground: sys.color.content.base,
      label: sys.color.content.base,
      foreground: sys.color.content.base,
      border: sys.color.container.high,
      focusRing: sys.color.tone.primary,
      error: sys.color.tone.destructive,
      description: stateColor.mutedContent,
    }),
    ...assignVars(fieldsetVars.shape, {
      corner: '0.375rem',
    }),
  },
});

export const legend = style({
  borderBottom: `1px solid ${fieldsetVars.color.legendBorder}`,
  paddingBottom: '0.75rem',
  fontWeight: '500',
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  letterSpacing: '-0.0025em',
  color: fieldsetVars.color.legendForeground,
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
});

export const label = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: fieldsetVars.color.label,
});

export const input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  margin: '0',
  border: `1px solid ${fieldsetVars.color.border}`,
  width: '100%',
  height: '2.5rem',
  borderRadius: fieldsetVars.shape.corner,
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  color: fieldsetVars.color.foreground,
});
globalStyle(`${input}:focus`, {
  outline: `2px solid ${fieldsetVars.color.focusRing}`,
  outlineOffset: '-1px',
});

export const error = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: fieldsetVars.color.error,
});

export const description = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: fieldsetVars.color.description,
});

export const fieldsetRecipe = recipe({
  base: fieldset,
});
