import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import { molecules } from '../../styles/layers.css';
import {
  createFieldLabelStackStyles,
  createFieldLabelTextStyles,
  createFieldTextInputStyles,
} from '../_foundation';

export const numberFieldVars = createThemeContract({
  color: {
    inputBackground: null,
    inputBorder: null,
    inputFocusRing: null,
    inputForeground: null,
    labelForeground: null,
    scrubAreaCursorShadow: null,
    stepperActiveBackground: null,
    stepperBackground: null,
    stepperBorder: null,
    stepperForeground: null,
    stepperHoverBackground: null,
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
    inputBackground: sys.color.surface.base,
    inputBorder: sys.color.border.base,
    inputFocusRing: sys.color.tone.primary,
    inputForeground: sys.color.content.base,
    labelForeground: sys.color.content.base,
    scrubAreaCursorShadow: stateColor.disabledContent,
    stepperActiveBackground: sys.color.container.low,
    stepperBackground: sys.color.container.base,
    stepperBorder: sys.color.border.base,
    stepperForeground: sys.color.content.base,
    stepperHoverBackground: sys.color.container.low,
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
  '@layer': {
    [molecules]: {
      ...createFieldLabelStackStyles({
        gap: numberFieldVars.spacing.fieldGap,
        inlineSize: numberFieldVars.layout.inputInlineSize,
      }),
      vars: {
        ...numberFieldDefaults,
      },
    },
  },
});

export const scrubArea = style({
  '@layer': {
    [molecules]: {
      fontWeight: numberFieldVars.typography.scrubAreaWeight,
      cursor: 'ew-resize',
      userSelect: 'none',
    },
  },
});

export const scrubAreaCursor = style({
  '@layer': {
    [molecules]: {
      filter: `drop-shadow(0 1px 1px ${numberFieldVars.color.scrubAreaCursorShadow})`,
    },
  },
});

export const label = style({
  '@layer': {
    [molecules]: {
      ...createFieldLabelTextStyles({
        color: numberFieldVars.color.labelForeground,
        cursor: 'ew-resize',
      }),
    },
  },
});

export const group = style({
  '@layer': {
    [molecules]: {
      display: 'flex',
      inlineSize: '100%',
    },
  },
});

export const input = style([
  typography.body.large,
  {
    '@layer': {
      [molecules]: {
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
  paddingBlock: sys.spacing[4],
  paddingInline: sys.spacing[4],
  border: `1px solid ${numberFieldVars.color.stepperBorder}`,
  borderRadius: numberFieldVars.shape.stepperCorner,
  backgroundColor: numberFieldVars.color.stepperBackground,
  backgroundClip: 'padding-box',
  color: numberFieldVars.color.stepperForeground,
  selectors: {
    '&:hover:not(:disabled):not([data-disabled]):not([data-loading])': {
      '@media': {
        '(hover: hover)': {
          backgroundColor: numberFieldVars.color.stepperHoverBackground,
        },
      },
    },
    '&:active:not(:disabled):not([data-disabled]):not([data-loading])': {
      backgroundColor: numberFieldVars.color.stepperActiveBackground,
    },
  },
} as const;

export const decrement = style({
  '@layer': {
    [molecules]: {
      ...stepperButtonStyle,
      borderStartEndRadius: numberFieldVars.shape.inputMergedCorner,
      borderEndEndRadius: numberFieldVars.shape.inputMergedCorner,
    },
  },
});

export const increment = style({
  '@layer': {
    [molecules]: {
      ...stepperButtonStyle,
      borderStartStartRadius: numberFieldVars.shape.inputMergedCorner,
      borderEndStartRadius: numberFieldVars.shape.inputMergedCorner,
    },
  },
});
