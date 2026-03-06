import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import { molecules } from '../../styles/layers.css';
import {
  createFieldLabelStackStyles,
  createFieldLabelTextStyles,
  createFieldTextInputStyles,
} from '../_foundation';

export const fieldVars = createThemeContract({
  color: {
    descriptionForeground: null,
    errorForeground: null,
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
    zero: null,
  },
});

const fieldDefaults = assignVars(fieldVars, {
  color: {
    descriptionForeground: stateColor.mutedContent,
    errorForeground: sys.color.tone.error,
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
    zero: sys.spacing[0],
  },
});

export const field = style({
  '@layer': {
    [molecules]: {
      vars: {
        ...fieldDefaults,
      },

      ...createFieldLabelStackStyles({
        gap: fieldVars.spacing.stackGap,
        inlineSize: fieldVars.layout.inputInlineSize,
      }),
    },
  },
});

export const label = style({
  '@layer': {
    [molecules]: {
      ...createFieldLabelTextStyles({
        color: fieldVars.color.labelForeground,
      }),
    },
  },
});

export const input = style([
  typography.body.large,
  {
    '@layer': {
      [molecules]: {
        ...createFieldTextInputStyles({
          backgroundColor: fieldVars.color.inputBackground,
          blockSize: fieldVars.size.inputBlockSize,
          borderColor: fieldVars.color.inputBorder,
          borderRadius: fieldVars.shape.inputCorner,
          focusRingColor: fieldVars.color.inputFocusRing,
          focusRingOffset: fieldVars.layout.inputFocusRingOffset,
          foreground: fieldVars.color.inputForeground,
          inlineSize: fieldVars.layout.inputInlineSize,
          paddingInlineEnd: fieldVars.spacing.inputPaddingInlineEnd,
          paddingInlineStart: fieldVars.spacing.inputPaddingInlineStart,
        }),
      },
    },
  },
]);

export const error = style({
  '@layer': {
    [molecules]: {
      color: fieldVars.color.errorForeground,
    },
  },
});

export const description = style({
  '@layer': {
    [molecules]: {
      marginBlock: fieldVars.spacing.zero,
      marginInline: fieldVars.spacing.zero,
      color: fieldVars.color.descriptionForeground,
    },
  },
});
