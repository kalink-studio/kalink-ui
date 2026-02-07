import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Input = style({
  boxSizing: 'border-box',
  paddingLeft: '0.875rem',
  paddingRight: 'calc(0.5rem + 1.5rem)',
  margin: '0',
  border: '1px solid var(--color-gray-200)',
  width: '16rem',
  height: '2.5rem',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
});
globalStyle(`${Input}:focus`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
  position: 'relative',
});

export const InputWrapper = style({
  position: 'relative',
});

export const Trigger = style({});

export const Clear = style({});

export const TriggerIcon = style({});

export const ClearIcon = style({});

export const Empty = style({});

globalStyle(`${InputWrapper}:has(${Clear}) ${Input}`, {
  paddingRight: 'calc(0.5rem + 1.5rem * 2)',
});

export const ActionButtons = style({
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
  color: 'var(--color-gray-600)',
  padding: '0',
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
  transition: 'opacity 0.1s,\n    transform 0.1s',
  transformOrigin: 'var(--transform-origin)',
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
globalStyle(`${Popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.95)',
});
globalStyle(`${Popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.95)',
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
  display: 'grid',
  gap: '0.5rem',
  alignItems: 'center',
  gridTemplateColumns: '0.75rem 1fr',
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

export const ItemText = style({
  gridColumnStart: '2',
});

export const ItemIndicator = style({
  gridColumnStart: '1',
});

export const ItemIndicatorIcon = style({
  display: 'block',
  width: '0.75rem',
  height: '0.75rem',
});

globalStyle(
  `${Trigger},
${Clear}`,
  {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '2.5rem',
    color: 'var(--color-gray-600)',
    border: 'none',
    padding: '0',
    borderRadius: '0.25rem',
    background: 'none',
  },
);
globalStyle(
  `${ClearIcon},
${TriggerIcon}`,
  {
    width: '1rem',
    height: '1rem',
  },
);
globalStyle(`${Empty}:not(:empty)`, {
  fontSize: '0.925rem',
  lineHeight: '1rem',
  color: 'var(--color-gray-600)',
  padding: '1rem',
});

export const ComboboxRecipe = recipe({
  base: Input,
});
