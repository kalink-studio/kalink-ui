import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: sys.color.content.base,
  position: 'relative',
});

export const inputWrapper = style({
  position: 'relative',
  display: 'inline-block',
});

const actionButtonStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5rem',
  height: '2.5rem',
  color: stateColor.mutedContent,
  border: 'none',
  padding: '0',
  borderRadius: '0.25rem',
  background: 'none',
} as const;

const actionIconStyle = {
  width: '1rem',
  height: '1rem',
} as const;

export const trigger = style(actionButtonStyle);

export const clear = style(actionButtonStyle);

export const input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  paddingRight: 'calc(0.5rem + 1.5rem)',
  margin: '0',
  border: `1px solid ${sys.color.container.high}`,
  width: '16rem',
  height: '2.5rem',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,

  selectors: {
    [`&:focus`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
    [`${inputWrapper}:has(${clear}) &`]: {
      paddingRight: 'calc(0.5rem + 1.5rem * 2)',
    },
  },
});

export const triggerIcon = style(actionIconStyle);

export const clearIcon = style(actionIconStyle);

export const empty = style({
  selectors: {
    [`&:not(:empty)`]: {
      fontSize: '0.925rem',
      lineHeight: '1rem',
      color: stateColor.mutedContent,
      padding: '1rem',
    },
  },
});

export const actionButtons = style({
  boxSizing: 'border-box',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bottom: '0',
  height: '2.5rem',
  right: '0.5rem',
  borderRadius: '0.25rem',
  border: 'none',
  color: stateColor.mutedContent,
  padding: '0',
});

export const positioner = style({
  outline: '0',
});

export const popup = style({
  boxSizing: 'border-box',
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  width: 'var(--anchor-width)',
  maxHeight: '23rem',
  maxWidth: 'var(--available-width)',
  transition: 'opacity 0.1s,\n    transform 0.1s',
  transformOrigin: 'var(--transform-origin)',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${sys.color.container.high}`,
      boxShadow: sys.elevation.moderate,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${sys.color.container.top}`,
      outlineOffset: '-1px',
    },
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'scale(0.95)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'scale(0.95)',
    },
  },
});

export const list = style({
  boxSizing: 'border-box',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  paddingBlock: '0.5rem',
  scrollPaddingBlock: '0.5rem',
  outline: '0',
  maxHeight: 'min(23rem, var(--available-height))',

  selectors: {
    [`&[data-empty]`]: {
      padding: '0',
    },
  },
});

export const item = style({
  boxSizing: 'border-box',
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: '0.5rem',
  paddingLeft: '1rem',
  paddingRight: '2rem',
  display: 'grid',
  gap: '0.5rem',
  alignItems: 'center',
  gridTemplateColumns: '0.75rem 1fr',
  fontSize: '1rem',
  lineHeight: '1rem',

  selectors: {
    [`&[data-highlighted]`]: {
      zIndex: '0',
      position: 'relative',
      color: sys.color.container.base,
    },
    [`&[data-highlighted]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: '0.5rem',
      borderRadius: '0.25rem',
      backgroundColor: sys.color.content.base,
    },
  },
});

export const itemText = style({
  gridColumnStart: '2',
});

export const itemIndicator = style({
  gridColumnStart: '1',
});

export const itemIndicatorIcon = style({
  display: 'block',
  width: '0.75rem',
  height: '0.75rem',
});

export const comboboxRecipe = recipe({
  base: input,
});
