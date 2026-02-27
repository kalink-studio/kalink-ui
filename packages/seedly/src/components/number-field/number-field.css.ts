import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import { createFieldLabelStyles, createFieldStackStyles } from '../_foundation';

export const numberFieldVars = createThemeContract({
  spacing: {
    controlSize: null,
    zero: null,
  },
  shape: {
    controlCorner: null,
    mergedCorner: null,
  },
});

const restingControlBorder = sys.color.border.base;

export const field = style({
  ...createFieldStackStyles({
    alignItems: 'start',
  }),
  vars: {
    ...assignVars(numberFieldVars.spacing, {
      controlSize: sys.spacing[14],
      zero: sys.spacing[0],
    }),
    ...assignVars(numberFieldVars.shape, {
      controlCorner: sys.shape.corner.medium,
      mergedCorner: sys.shape.corner.none,
    }),
  },
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
    marginBlock: numberFieldVars.spacing.zero,
    marginInline: numberFieldVars.spacing.zero,
    paddingBlock: numberFieldVars.spacing.zero,
    paddingInline: numberFieldVars.spacing.zero,
    borderRadius: numberFieldVars.shape.mergedCorner,
    borderBlockStart: `1px solid ${restingControlBorder}`,
    borderBlockEnd: `1px solid ${restingControlBorder}`,
    borderInlineStart: 'none',
    borderInlineEnd: 'none',
    flex: '1 1 auto',
    minInlineSize: '0',
    blockSize: numberFieldVars.spacing.controlSize,
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
  inlineSize: numberFieldVars.spacing.controlSize,
  blockSize: numberFieldVars.spacing.controlSize,
  marginBlock: numberFieldVars.spacing.zero,
  marginInline: numberFieldVars.spacing.zero,
  outline: '0',
  paddingBlock: numberFieldVars.spacing.zero,
  paddingInline: numberFieldVars.spacing.zero,
  border: `1px solid ${restingControlBorder}`,
  borderRadius: numberFieldVars.shape.controlCorner,
  backgroundColor: sys.color.container.base,
  backgroundClip: 'padding-box',
  color: sys.color.content.base,
  userSelect: 'none',
} as const;

export const decrement = style({
  ...stepperButtonStyle,
  borderStartEndRadius: numberFieldVars.shape.mergedCorner,
  borderEndEndRadius: numberFieldVars.shape.mergedCorner,
  backgroundColor: sys.color.container.low,
});

export const increment = style({
  ...stepperButtonStyle,
  borderStartStartRadius: numberFieldVars.shape.mergedCorner,
  borderEndStartRadius: numberFieldVars.shape.mergedCorner,

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
