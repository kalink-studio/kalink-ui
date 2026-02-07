import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  margin: '0',
  border: '1px solid var(--color-gray-200)',
  width: '16rem',
  height: '2.5rem',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
  outline: 'none',
  '@media': {
    '(min-width: 500px)': {
      width: '20rem',
    },
  },
});
globalStyle(`${Input}:focus`, {
  borderColor: 'var(--color-blue)',
  outline: '1px solid var(--color-blue)',
});

export const Label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
});

export const Positioner = style({
  outline: '0',
});

export const Popup = style({
  boxSizing: 'border-box',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
  width: 'var(--anchor-width)',
  maxHeight: '23rem',
  maxWidth: 'var(--available-width)',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow:
        '0 10px 15px -3px var(--color-gray-200),\n      0 4px 6px -4px var(--color-gray-200)',
    },
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
      outlineOffset: '-1px',
    },
  },
});

export const List = style({
  boxSizing: 'border-box',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  paddingBlock: '0.5rem',
  scrollPaddingBlock: '0.5rem',
  outline: '0',
  maxHeight: 'min(23rem, var(--available-height))',
});
globalStyle(`${List}[data-empty]`, {
  padding: '0',
});

export const Item = style({
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
globalStyle(`${Item}[data-highlighted]`, {
  zIndex: '0',
  position: 'relative',
  color: 'var(--color-gray-50)',
});
globalStyle(`${Item}[data-highlighted]::before`, {
  content: "''",
  zIndex: '-1',
  position: 'absolute',
  insetBlock: '0',
  insetInline: '0.5rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-900)',
});

export const Separator = style({
  margin: '0.375rem 1rem',
  height: '1px',
  backgroundColor: 'var(--color-gray-200)',
});

export const Empty = style({});

globalStyle(`${Empty}:not(:empty)`, {
  boxSizing: 'border-box',
  padding: '1rem',
  fontSize: '0.925rem',
  lineHeight: '1rem',
  color: 'var(--color-gray-600)',
});

export const AutocompleteRecipe = recipe({
  base: Input,
});
