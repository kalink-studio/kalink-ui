import { style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import { createFieldLabelStyles, createFieldStackStyles } from '../_foundation';

const restingControlBorder = sys.color.border.base;

export const field = style({
  ...createFieldStackStyles({
    alignItems: 'start',
  }),
});

export const scrubArea = style({
  fontWeight: sys.typography.headline.small.weight,
  cursor: 'ew-resize',
  userSelect: 'none',
});

export const scrubAreaCursor = style({
  filter: `drop-shadow(0 1px 1px ${stateColor.disabledContent})`,
});

export const label = style({
  ...createFieldLabelStyles({
    cursor: 'ew-resize',
  }),
});

export const group = style({
  display: 'flex',
  inlineSize: '100%',
});

export const input = style([
  typography.body.large,
  {
    marginBlock: '0',
    marginInline: '0',
    paddingBlock: '0',
    paddingInline: '0',
    borderRadius: sys.shape.corner.none,
    borderBlockStart: `1px solid ${restingControlBorder}`,
    borderBlockEnd: `1px solid ${restingControlBorder}`,
    borderInlineStart: 'none',
    borderInlineEnd: 'none',
    flex: '1 1 auto',
    minInlineSize: '0',
    blockSize: sys.spacing[14],
    backgroundColor: sys.color.surface.base,
    color: sys.color.content.base,
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',

    selectors: {
      [`&:focus`]: {
        zIndex: '1',
        outline: `2px solid ${sys.color.tone.primary}`,
        outlineOffset: '-1px',
      },
    },
  },
]);

const stepperButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: sys.spacing[14],
  blockSize: sys.spacing[14],
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  border: `1px solid ${restingControlBorder}`,
  borderRadius: sys.shape.corner.medium,
  backgroundColor: sys.color.container.base,
  backgroundClip: 'padding-box',
  color: sys.color.content.base,
  userSelect: 'none',
} as const;

export const decrement = style({
  ...stepperButtonStyle,
  borderStartEndRadius: sys.shape.corner.none,
  borderEndEndRadius: sys.shape.corner.none,
  backgroundColor: sys.color.container.low,
});

export const increment = style({
  ...stepperButtonStyle,
  borderStartStartRadius: sys.shape.corner.none,
  borderEndStartRadius: sys.shape.corner.none,

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: sys.color.container.low,
    },
  },
});
