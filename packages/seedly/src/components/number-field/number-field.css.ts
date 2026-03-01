import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFieldTextInputStyles,
  createFieldLabelStyles,
  createFieldStackStyles,
} from '../_foundation';

export const numberFieldVars = createThemeContract({
  color: {
    decrementBackground: null,
    incrementActiveBackground: null,
    incrementBackground: null,
    incrementHoverBackground: null,
    inputBackground: null,
    inputBorder: null,
    inputFocusRing: null,
    inputForeground: null,
    labelForeground: null,
    scrubAreaCursorShadow: null,
    stepperBorder: null,
    stepperForeground: null,
  },
  layout: {
    inputFocusRingOffset: null,
    inputInlineSize: null,
  },
  shape: {
    inputMergedCorner: null,
    stepperCorner: null,
  },
  size: {
    controlSize: null,
  },
  spacing: {
    fieldGap: null,
  },
  typography: {
    scrubAreaWeight: null,
  },
});

const numberFieldDefaults = assignVars(numberFieldVars, {
  color: {
    decrementBackground: sys.color.container.low,
    incrementActiveBackground: sys.color.container.low,
    incrementBackground: sys.color.container.base,
    incrementHoverBackground: sys.color.container.low,
    inputBackground: sys.color.surface.base,
    inputBorder: sys.color.border.base,
    inputFocusRing: sys.color.tone.primary,
    inputForeground: sys.color.content.base,
    labelForeground: sys.color.content.base,
    scrubAreaCursorShadow: stateColor.disabledContent,
    stepperBorder: sys.color.border.base,
    stepperForeground: sys.color.content.base,
  },
  layout: {
    inputFocusRingOffset: '-1px',
    inputInlineSize: '100%',
  },
  shape: {
    inputMergedCorner: sys.shape.corner.none,
    stepperCorner: sys.shape.corner.medium,
  },
  size: {
    controlSize: sys.spacing[14],
  },
  spacing: {
    fieldGap: sys.spacing[2],
  },
  typography: {
    scrubAreaWeight: sys.typography.headline.small.weight,
  },
});

export const field = style({
  ...createFieldStackStyles({
    alignItems: 'start',
    gap: numberFieldVars.spacing.fieldGap,
    inlineSize: numberFieldVars.layout.inputInlineSize,
  }),
  vars: {
    ...numberFieldDefaults,
  },
});

export const scrubArea = style({
  fontWeight: numberFieldVars.typography.scrubAreaWeight,
  cursor: 'ew-resize',
  userSelect: 'none',
});

export const scrubAreaCursor = style({
  filter: `drop-shadow(0 1px 1px ${numberFieldVars.color.scrubAreaCursorShadow})`,
});

export const label = style({
  ...createFieldLabelStyles({
    color: numberFieldVars.color.labelForeground,
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
    ...createFieldTextInputStyles({
      backgroundColor: numberFieldVars.color.inputBackground,
      blockSize: numberFieldVars.size.controlSize,
      borderColor: numberFieldVars.color.inputBorder,
      borderRadius: numberFieldVars.shape.inputMergedCorner,
      focusRingColor: numberFieldVars.color.inputFocusRing,
      focusRingOffset: numberFieldVars.layout.inputFocusRingOffset,
      foreground: numberFieldVars.color.inputForeground,
      inlineSize: numberFieldVars.layout.inputInlineSize,
      paddingInlineEnd: sys.spacing[0],
      paddingInlineStart: sys.spacing[0],
    }),

    borderInlineStart: 'none',
    borderInlineEnd: 'none',

    flex: '1 1 auto',
    minInlineSize: '0',

    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',

    selectors: {
      [`&:focus`]: {
        zIndex: '1',
        outline: `2px solid ${numberFieldVars.color.inputFocusRing}`,
        outlineOffset: numberFieldVars.layout.inputFocusRingOffset,
      },
    },
  },
]);

const stepperButtonStyle = {
  justifyContent: 'center',
  inlineSize: numberFieldVars.size.controlSize,
  blockSize: numberFieldVars.size.controlSize,
  marginBlock: sys.spacing[0],
  marginInline: sys.spacing[0],
  outline: '0',
  paddingBlock: sys.spacing[0],
  paddingInline: sys.spacing[0],
  border: `1px solid ${numberFieldVars.color.stepperBorder}`,
  borderRadius: numberFieldVars.shape.stepperCorner,
  backgroundColor: numberFieldVars.color.incrementBackground,
  backgroundClip: 'padding-box',
  color: numberFieldVars.color.stepperForeground,
} as const;

export const decrement = style({
  ...stepperButtonStyle,
  borderStartEndRadius: numberFieldVars.shape.inputMergedCorner,
  borderEndEndRadius: numberFieldVars.shape.inputMergedCorner,
  backgroundColor: numberFieldVars.color.decrementBackground,
});

export const increment = style({
  ...stepperButtonStyle,
  borderStartStartRadius: numberFieldVars.shape.inputMergedCorner,
  borderEndStartRadius: numberFieldVars.shape.inputMergedCorner,

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: numberFieldVars.color.incrementHoverBackground,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: numberFieldVars.color.incrementActiveBackground,
    },
  },
});
