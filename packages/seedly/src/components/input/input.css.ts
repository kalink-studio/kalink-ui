import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import { atoms } from '../../styles/layers.css';
import {
  createFieldLabelStackStyles,
  createFieldLabelTextStyles,
  createFieldTextInputStyles,
} from '../_foundation';

export const inputVars = createThemeContract({
  color: {
    inputBackground: null,
    inputBorder: null,
    inputFocusRing: null,
    inputForeground: null,
    labelForeground: null,
  },
  layout: {
    inputFocusRingOffset: null,
    inputInlineSize: null,
  },
  shape: {
    inputCorner: null,
  },
  size: {
    inputBlockSize: null,
  },
  spacing: {
    inputPaddingInlineEnd: null,
    inputPaddingInlineStart: null,
    stackGap: null,
  },
});

const inputDefaults = assignVars(inputVars, {
  color: {
    inputBackground: sys.color.surface.base,
    inputBorder: sys.color.border.base,
    inputFocusRing: sys.color.tone.primary,
    inputForeground: sys.color.content.base,
    labelForeground: sys.color.content.base,
  },
  layout: {
    inputFocusRingOffset: '-1px',
    inputInlineSize: '100%',
  },
  shape: {
    inputCorner: sys.shape.corner.medium,
  },
  size: {
    inputBlockSize: sys.spacing[14],
  },
  spacing: {
    inputPaddingInlineEnd: sys.spacing[4],
    inputPaddingInlineStart: sys.spacing[4],
    stackGap: sys.spacing[2],
  },
});

export const label = style({
  '@layer': {
    [atoms]: {
      ...createFieldLabelStackStyles({
        gap: inputVars.spacing.stackGap,
        inlineSize: inputVars.layout.inputInlineSize,
      }),
      ...createFieldLabelTextStyles({
        color: inputVars.color.labelForeground,
      }),
      vars: {
        ...inputDefaults,
      },
    },
  },
});

export const input = style([
  typography.body.large,
  {
    '@layer': {
      [atoms]: {
        ...createFieldTextInputStyles({
          backgroundColor: inputVars.color.inputBackground,
          blockSize: inputVars.size.inputBlockSize,
          borderColor: inputVars.color.inputBorder,
          borderRadius: inputVars.shape.inputCorner,
          focusRingColor: inputVars.color.inputFocusRing,
          focusRingOffset: inputVars.layout.inputFocusRingOffset,
          foreground: inputVars.color.inputForeground,
          inlineSize: inputVars.layout.inputInlineSize,
          paddingInlineEnd: inputVars.spacing.inputPaddingInlineEnd,
          paddingInlineStart: inputVars.spacing.inputPaddingInlineStart,
        }),
      },
    },
  },
]);
