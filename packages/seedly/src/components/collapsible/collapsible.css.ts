import { style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';

export const collapsible = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minBlockSize: '9rem',
  color: sys.color.content.base,
});

export const trigger = style([
  typography.label.medium,
  {
    paddingBlock: sys.spacing[2],
    paddingInline: sys.spacing[4],
    borderRadius: '0.25rem',

    selectors: {
      [`&:focus-visible`]: {
        outlineOffset: '0',
      },
    },
  },
]);

export const icon = style({
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
  transition: 'transform 150ms ease-out',

  selectors: {
    [`${trigger}[data-panel-open] &`]: {
      transform: 'rotate(90deg)',
    },
  },
});

export const panel = style([
  typography.body.medium,
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    blockSize: 'var(--collapsible-panel-height)',
    overflow: 'hidden',
    transition: 'all 150ms ease-out',

    selectors: {
      [`&[hidden]:not([hidden='until-found'])`]: {
        display: 'none',
      },
      [`&[data-starting-style]`]: {
        blockSize: '0',
      },
      [`&[data-ending-style]`]: {
        blockSize: '0',
      },
    },
  },
]);

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[4],
  marginBlockStart: sys.spacing[2],
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[11],
  paddingInlineEnd: '0',
  backgroundColor: sys.color.container.low,
  borderRadius: '0.25rem',
  cursor: 'text',
});
