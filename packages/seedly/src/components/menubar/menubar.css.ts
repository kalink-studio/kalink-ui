import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const menubar = style({
  display: 'flex',
  backgroundColor: sys.color.container.base,
  border: `1px solid ${sys.color.container.high}`,
  borderRadius: '0.375rem',
  padding: '0.125rem',
});

export const menuTrigger = style({
  boxSizing: 'border-box',
  background: 'none',
  padding: '0 0.75rem',
  margin: '0',
  outline: '0',
  border: '0',
  color: stateColor.mutedContent,
  borderRadius: '0.25rem',
  userSelect: 'none',
  height: '2rem',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  fontWeight: '500',

  selectors: {
    [`&[data-pressed]`]: {
      backgroundColor: sys.color.container.low,
      outline: 'none',
    },
    [`&:focus-visible`]: {
      backgroundColor: sys.color.container.low,
      outline: 'none',
    },
    [`&[data-disabled]`]: {
      opacity: '0.5',
    },
  },
});

export const menuPositioner = style({
  outline: '0',
});

export const menuPopup = style({
  boxSizing: 'border-box',
  paddingBlock: '0.25rem',
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
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
    [`&[data-ending-style]`]: {
      opacity: '0',
      transition: 'opacity 150ms',
    },
    [`&[data-instant]`]: {
      transition: 'none',
    },
  },
});

export const menuItem = style({
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  padding: '0.5rem 1rem',
  display: 'flex',
  fontSize: '0.875rem',
  lineHeight: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',

  selectors: {
    [`&[data-popup-open]`]: {
      zIndex: '0',
      position: 'relative',
    },
    [`&[data-popup-open]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: '0.25rem',
      borderRadius: '0.25rem',
      backgroundColor: sys.color.container.low,
    },
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
      insetInline: '0.25rem',
      borderRadius: '0.25rem',
      backgroundColor: sys.color.content.base,
    },
  },
});

export const menuSeparator = style({
  margin: '0.375rem 1rem',
  height: '1px',
  backgroundColor: sys.color.container.high,
});

export const menubarRecipe = recipe({
  base: menubar,
});
