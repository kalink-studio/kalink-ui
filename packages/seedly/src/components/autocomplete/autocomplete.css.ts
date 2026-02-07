import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  margin: '0',
  border: `1px solid ${sys.color.container.high}`,
  width: '16rem',
  height: '2.5rem',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  outline: 'none',
  '@media': {
    '(min-width: 500px)': {
      width: '20rem',
    },
  },
});
globalStyle(`${input}:focus`, {
  borderColor: sys.color.tone.primary,
  outline: `1px solid ${sys.color.tone.primary}`,
});

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: sys.color.content.base,
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
});

export const list = style({
  boxSizing: 'border-box',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  paddingBlock: '0.5rem',
  scrollPaddingBlock: '0.5rem',
  outline: '0',
  maxHeight: 'min(23rem, var(--available-height))',
});
globalStyle(`${list}[data-empty]`, {
  padding: '0',
});

export const item = style({
  boxSizing: 'border-box',
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: '0.5rem',
  paddingLeft: '1rem',
  paddingRight: '2rem',
  display: 'flex',
  fontSize: '1rem',
  lineHeight: '1rem',
});
globalStyle(`${item}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: sys.color.container.base,
});
globalStyle(`${item}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.5rem',
  borderRadius: '0.25rem',
  backgroundColor: sys.color.content.base,
});

export const separator = style({
  margin: '0.375rem 1rem',
  height: '1px',
  backgroundColor: sys.color.container.high,
});

export const empty = style({});

globalStyle(`${empty}:not(:empty)`, {
  boxSizing: 'border-box',
  padding: '1rem',
  fontSize: '0.925rem',
  lineHeight: '1rem',
  color: stateColor.mutedContent,
});

export const autocompleteRecipe = recipe({
  base: input,
});
