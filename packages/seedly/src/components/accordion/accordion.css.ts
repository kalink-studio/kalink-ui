import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const accordion = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '24rem',
  maxWidth: 'calc(100vw - 8rem)',
  flexDirection: 'column',
  justifyContent: 'center',
  color: sys.color.content.base,
});

export const item = style({
  borderBottom: `1px solid ${sys.color.container.high}`,
});

export const header = style({
  margin: '0',
});

export const trigger = style({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  width: '100%',
  gap: '1rem',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBlock: '0.5rem',
  paddingInline: '0.75rem 0.25rem',
  color: sys.color.content.base,
  fontFamily: 'inherit',
  fontWeight: '500',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  background: sys.color.container.base,
  border: 'none',
  outline: 'none',
  textAlign: 'left',
});
globalStyle(`${trigger}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: sys.color.container.low,
    },
  },
});
globalStyle(`${trigger}:focus-visible`, {
  outline: `2px solid ${sys.color.tone.primary}`,
  zIndex: '1',
});

export const triggerIcon = style({
  boxSizing: 'border-box',
  flexShrink: '0',
  width: '0.75rem',
  height: '0.75rem',
  marginRight: '0.5rem',
  transition: 'transform 150ms ease-out',
});
globalStyle(`[data-panel-open] > ${triggerIcon}`, {
  transform: 'rotate(45deg) scale(1.1)',
});

export const panel = style({
  boxSizing: 'border-box',
  height: 'var(--accordion-panel-height)',
  overflow: 'hidden',
  color: stateColor.mutedContent,
  fontSize: '1rem',
  lineHeight: '1.5rem',
  transition: 'height 150ms ease-out',
});
globalStyle(`${panel}[data-starting-style]`, {
  height: '0',
});
globalStyle(`${panel}[data-ending-style]`, {
  height: '0',
});

export const content = style({
  padding: '0.75rem',
});

export const accordionRecipe = recipe({
  base: accordion,
});
