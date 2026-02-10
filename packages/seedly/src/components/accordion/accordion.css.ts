import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys, transition } from '../../styles';

export const accordion = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',

  color: sys.color.content.base,
});

export const item = style({
  borderBlockEnd: `1px solid ${sys.color.container.high}`,
});

export const header = style({
  marginBlock: '0',
  marginInline: '0',
});

export const trigger = style({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  inlineSize: '100%',
  gap: sys.spacing[8],
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[6],
  paddingInlineEnd: sys.spacing[2],

  color: sys.color.content.base,
  fontFamily: 'inherit',
  fontWeight: '500',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  textAlign: 'start',

  background: sys.color.container.base,
  border: 'none',
  outline: 'none',

  ':hover': {
    backgroundColor: sys.color.container.low,
  },

  ':focus-visible': {
    outline: `2px solid ${sys.color.tone.primary}`,
    zIndex: '1',
  },
});

export const triggerIcon = style({
  boxSizing: 'border-box',
  flexShrink: '0',
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
  marginInlineEnd: sys.spacing[4],
  transition: transition('transform', {
    duration: 'short.4',
    easing: 'standard',
  }),

  selectors: {
    '[data-panel-open] > &': {
      transform: 'rotate(45deg) scale(1.1)',
    },
  },
});

export const panel = style({
  boxSizing: 'border-box',
  blockSize: 'var(--accordion-panel-height)',
  overflow: 'hidden',
  color: stateColor.mutedContent,
  fontSize: '1rem',
  lineHeight: '1.5rem',
  transition: 'block-size 150ms ease-out',

  selectors: {
    '&[data-starting-style]': {
      blockSize: '0',
    },
    '&[data-ending-style]': {
      blockSize: '0',
    },
  },
});

export const content = style({
  paddingBlock: sys.spacing[6],
  paddingInline: sys.spacing[6],
});

export const accordionRecipe = recipe({
  base: accordion,
});
