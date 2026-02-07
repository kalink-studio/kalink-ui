import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Accordion = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '24rem',
  maxWidth: 'calc(100vw - 8rem)',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'var(--color-gray-900)',
});

export const Item = style({
  borderBottom: '1px solid var(--color-gray-200)',
});

export const Header = style({
  margin: '0',
});

export const Trigger = style({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  width: '100%',
  gap: '1rem',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBlock: '0.5rem',
  paddingInline: '0.75rem 0.25rem',
  color: 'var(--color-gray-900)',
  fontFamily: 'inherit',
  fontWeight: '500',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  background: 'var(--color-gray-50)',
  border: 'none',
  outline: 'none',
  textAlign: 'left',
});
globalStyle(`${Trigger}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Trigger}:focus-visible`, {
  outline: '2px solid var(--color-blue)',
  zIndex: '1',
});

export const TriggerIcon = style({
  boxSizing: 'border-box',
  flexShrink: '0',
  width: '0.75rem',
  height: '0.75rem',
  marginRight: '0.5rem',
  transition: 'transform 150ms ease-out',
});
globalStyle(`[data-panel-open] > ${TriggerIcon}`, {
  transform: 'rotate(45deg) scale(1.1)',
});

export const Panel = style({
  boxSizing: 'border-box',
  height: 'var(--accordion-panel-height)',
  overflow: 'hidden',
  color: 'var(--color-gray-600)',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  transition: 'height 150ms ease-out',
});
globalStyle(`${Panel}[data-starting-style]`, {
  height: '0',
});
globalStyle(`${Panel}[data-ending-style]`, {
  height: '0',
});

export const Content = style({
  padding: '0.75rem',
});

export const AccordionRecipe = recipe({
  base: Accordion,
});
