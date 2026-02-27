import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, transition, typography } from '../../styles';

export const collapsibleVars = createThemeContract({
  layout: {
    minBlockSize: null,
  },
  shape: {
    triggerCorner: null,
    contentCorner: null,
  },
});

const collapsibleLayoutDefaults = assignVars(collapsibleVars.layout, {
  minBlockSize: '9rem',
});

const collapsibleShapeDefaults = assignVars(collapsibleVars.shape, {
  triggerCorner: sys.shape.corner.small,
  contentCorner: sys.shape.corner.small,
});

export const collapsible = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minBlockSize: collapsibleVars.layout.minBlockSize,
  color: sys.color.content.base,
  vars: {
    ...collapsibleLayoutDefaults,
    ...collapsibleShapeDefaults,
  },
});

export const trigger = style([
  {
    paddingBlock: sys.spacing[2],
    paddingInline: sys.spacing[4],
    borderRadius: collapsibleVars.shape.triggerCorner,

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
  transition: transition('transform', {
    duration: 'short.4',
    easing: 'standard',
  }),

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
    transition: transition('all', {
      duration: 'short.4',
      easing: 'standard',
    }),

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
  borderRadius: collapsibleVars.shape.contentCorner,
  cursor: 'text',
});
