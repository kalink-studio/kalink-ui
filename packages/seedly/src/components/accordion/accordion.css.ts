import { style } from '@vanilla-extract/css';

import { stateColor, sys, transition, typography } from '../../styles';

export const accordion = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  color: sys.color.content.base,
});

export const item = style({
  borderBlockEnd: `1px solid ${sys.color.border.low}`,
});

export const header = style({
  marginBlock: '0',
  marginInline: '0',
});

export const trigger = style([
  {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    inlineSize: '100%',

    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[6],
    paddingInlineEnd: sys.spacing[2],

    position: 'relative',

    textAlign: 'start',

    selectors: {
      '&:focus-visible': {
        zIndex: '1',
        outlineOffset: '0',
      },
    },
  },
]);

export const triggerIcon = style({
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

export const panel = style([
  typography.body.large,
  {
    blockSize: 'var(--accordion-panel-height)',
    overflow: 'hidden',

    color: stateColor.mutedContent,

    transition: transition('block-size', {
      duration: 'short.4',
      easing: 'standard',
    }),

    selectors: {
      '&[data-starting-style]': {
        blockSize: '0',
      },
      '&[data-ending-style]': {
        blockSize: '0',
      },
    },
  },
]);

export const content = style({
  paddingBlock: sys.spacing[6],
  paddingInline: sys.spacing[6],
});
