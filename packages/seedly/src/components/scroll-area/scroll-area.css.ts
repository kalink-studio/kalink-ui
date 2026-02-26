import { style } from '@vanilla-extract/css';

import { stateColor, sys } from '../../styles';

export const scrollArea = style({
  inlineSize: '100%',
  blockSize: '8.5rem',
});

export const viewport = style({
  blockSize: '100%',
  borderRadius: '0.375rem',
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
  borderRadius: '0.375rem',
  transition: 'opacity 150ms',
  pointerEvents: 'none',

  selectors: {
    [`&[data-scrolling]`]: {
      opacity: '1',
      transitionDuration: '0ms',
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
