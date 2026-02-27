import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';

export const scrollAreaVars = createThemeContract({
  layout: {
    rootBlockSize: null,
  },
  shape: {
    viewportCorner: null,
    scrollbarCorner: null,
  },
});

const scrollAreaLayoutDefaults = assignVars(scrollAreaVars.layout, {
  rootBlockSize: '8.5rem',
});

const scrollAreaShapeDefaults = assignVars(scrollAreaVars.shape, {
  viewportCorner: sys.shape.corner.medium,
  scrollbarCorner: sys.shape.corner.medium,
});

export const scrollArea = style({
  inlineSize: '100%',
  blockSize: scrollAreaVars.layout.rootBlockSize,
  vars: {
    ...scrollAreaLayoutDefaults,
    ...scrollAreaShapeDefaults,
  },
});

export const viewport = style({
  blockSize: '100%',
  borderRadius: scrollAreaVars.shape.viewportCorner,
  outline: `1px solid ${sys.color.border.base}`,
  outlineOffset: '-1px',

  selectors: {
    [`&:focus-visible`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[8],
  paddingBlock: sys.spacing[6],
  paddingInlineStart: sys.spacing[8],
  paddingInlineEnd: sys.spacing[10],
});
export const scrollbar = style({
  display: 'flex',
  justifyContent: 'center',
  inlineSize: sys.spacing[2],
  marginBlock: sys.spacing[4],
  marginInline: sys.spacing[4],
  opacity: '0',
  backgroundColor: sys.color.container.high,
  borderRadius: scrollAreaVars.shape.scrollbarCorner,
  transition: transition('opacity', {
    duration: 'short.4',
    easing: 'standard',
  }),
  pointerEvents: 'none',

  selectors: {
    [`&[data-scrolling]`]: {
      opacity: '1',
      transition: 'none',
      pointerEvents: 'auto',
    },
    [`&[data-hovering]`]: {
      opacity: '1',
      pointerEvents: 'auto',
    },
    [`&::before`]: {
      inlineSize: sys.spacing[9],
      blockSize: '100%',
      position: 'absolute',
      content: "''",
    },
  },
});

export const thumb = style({
  inlineSize: '100%',
  borderRadius: 'inherit',
  backgroundColor: stateColor.disabledContent,
});
