import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Tabs = style({
  border: '1px solid var(--color-gray-200)',
  borderRadius: '0.375rem',
});

export const List = style({
  display: 'flex',
  position: 'relative',
  zIndex: '0',
  paddingInline: '0.25rem',
  gap: '0.25rem',
  boxShadow: 'inset 0 -1px var(--color-gray-200)',
});

export const Tab = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '0',
  margin: '0',
  outline: '0',
  background: 'none',
  appearance: 'none',
  color: 'var(--color-gray-600)',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  wordBreak: 'keep-all',
  paddingInline: '0.5rem',
  paddingBlock: '0',
  height: '2rem',
});
globalStyle(`${Tab}[data-active]`, {
  color: 'var(--color-gray-900)',
});
globalStyle(`${Tab}:hover`, {
  '@media': {
    '(hover: hover)': {
      color: 'var(--color-gray-900)',
    },
  },
});
globalStyle(`${Tab}:focus-visible`, {
  position: 'relative',
});
globalStyle(`${Tab}:focus-visible::before`, {
  content: "''",
  position: 'absolute',
  inset: '0.25rem 0',
  borderRadius: '0.25rem',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Indicator = style({
  position: 'absolute',
  zIndex: '-1',
  left: '0',
  top: '50%',
  translate: 'var(--active-tab-left) -50%',
  width: 'var(--active-tab-width)',
  height: '1.5rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--color-gray-100)',
  transitionProperty: 'translate, width',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-in-out',
});

export const Panel = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '8rem',
  outline: '0',
});
globalStyle(`${Panel}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
  borderRadius: '0.375rem',
});
globalStyle(`${Panel}[hidden]`, {
  display: 'none',
});

export const Icon = style({
  width: '2.5rem',
  height: '2.5rem',
  color: 'var(--color-gray-300)',
});

export const TabsRecipe = recipe({
  base: Tabs,
});
