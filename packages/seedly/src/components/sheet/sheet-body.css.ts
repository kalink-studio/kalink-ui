import { globalStyle, style } from '@vanilla-extract/css';

import { sys, transition } from '../../styles';

export const sheetBodyRoot = style({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',

  overflow: 'hidden',
});

export const sheetBodyViewport = style({
  height: '100%',
});

export const sheetBodyScrollbar = style({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  background: 'transparent',
  transition: transition('background', { duration: 'short.3' }),
  borderRadius: sys.shape.corner.small,

  selectors: {
    '&:hover': {
      background: `color-mix(in srgb, ${sys.surface.foreground} 10%, transparent)`,
    },

    '&[data-orientation="vertical"]': {
      width: sys.spacing[2],
    },
  },
});

export const sheetBodyThumb = style({
  flex: 1,
  background: `color-mix(in srgb, ${sys.surface.foreground} 50%, transparent)`,
  borderRadius: sys.shape.corner.small,
  position: 'relative',
  opacity: 0,
  transition: transition('opacity', { duration: 'short.3' }),
  pointerEvents: 'none',

  selectors: {
    '&:hover': {
      background: `color-mix(in srgb, ${sys.surface.foreground} 75%, transparent)`,
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      insetBlockStart: '50%',
      insetInlineStart: '50%',
      width: '100%',
      height: '100%',
      minWidth: sys.spacing[4],
      minHeight: sys.spacing[4],
      transform: 'translate(-50%, -50%)',
    },
  },
});

globalStyle(`${sheetBodyScrollbar}[data-state="visible"] ${sheetBodyThumb}`, {
  opacity: 1,
  pointerEvents: 'auto',
});
