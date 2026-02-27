import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFieldTextInputStyles,
  createFieldLabelStyles,
  createFieldStackStyles,
  createFloatingItemStyles,
  createFloatingListStyles,
  createFloatingAnchoredSurfaceStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
  floatingPanelMaxBlockSize,
} from '../_foundation';

export const autocompleteVars = createThemeContract({
  color: {
    emptyForeground: null,
    inputBackground: null,
    inputBorder: null,
    inputFocusRing: null,
    inputForeground: null,
    itemHighlightedBackground: null,
    itemHighlightedForeground: null,
    label: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupShadow: null,
  },
  layout: {
    inputFocusRingOffset: null,
    inputInlineSize: null,
  },
  shape: {
    inputCorner: null,
    itemHighlightCorner: null,
    popupCorner: null,
  },
  size: {
    inputBlockSize: null,
    listMaxBlockSize: null,
  },
  spacing: {
    emptyPaddingBlock: null,
    emptyPaddingInline: null,
    inputPaddingInlineEnd: null,
    inputPaddingInlineStart: null,
    itemHighlightInsetInline: null,
    listPaddingBlock: null,
    listScrollPaddingBlock: null,
    stackGap: null,
    zero: null,
  },
});

const autocompleteDefaults = assignVars(autocompleteVars, {
  color: {
    emptyForeground: stateColor.mutedContent,
    inputBackground: sys.color.surface.base,
    inputBorder: sys.color.border.base,
    inputFocusRing: sys.color.tone.primary,
    inputForeground: sys.color.content.base,
    itemHighlightedBackground: sys.color.content.base,
    itemHighlightedForeground: sys.color.container.base,
    label: sys.color.content.base,
    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupShadow: sys.elevation.moderate,
  },
  layout: {
    inputFocusRingOffset: '-1px',
    inputInlineSize: '100%',
  },
  shape: {
    inputCorner: sys.shape.corner.medium,
    itemHighlightCorner: sys.shape.corner.small,
    popupCorner: sys.shape.corner.medium,
  },
  size: {
    inputBlockSize: sys.spacing[14],
    listMaxBlockSize: floatingPanelMaxBlockSize,
  },
  spacing: {
    emptyPaddingBlock: sys.spacing[8],
    emptyPaddingInline: sys.spacing[8],
    inputPaddingInlineEnd: sys.spacing[4],
    inputPaddingInlineStart: sys.spacing[4],
    itemHighlightInsetInline: sys.spacing[4],
    listPaddingBlock: sys.spacing[0],
    listScrollPaddingBlock: sys.spacing[0],
    stackGap: sys.spacing[2],
    zero: sys.spacing[0],
  },
});

const autocompleteItemHighlightSelectors =
  createInsetHighlightStyles({
    backgroundColor: autocompleteVars.color.itemHighlightedBackground,
    borderRadius: autocompleteVars.shape.itemHighlightCorner,
    insetInline: autocompleteVars.spacing.itemHighlightInsetInline,
    textColor: autocompleteVars.color.itemHighlightedForeground,
  }).selectors ?? {};

export const input = style([
  typography.body.large,
  {
    ...createFieldTextInputStyles({
      paddingInlineEnd: autocompleteVars.spacing.inputPaddingInlineEnd,
      paddingInlineStart: autocompleteVars.spacing.inputPaddingInlineStart,
      blockSize: autocompleteVars.size.inputBlockSize,
      inlineSize: autocompleteVars.layout.inputInlineSize,

      foreground: autocompleteVars.color.inputForeground,
      backgroundColor: autocompleteVars.color.inputBackground,
      borderColor: autocompleteVars.color.inputBorder,
      borderRadius: autocompleteVars.shape.inputCorner,
      focusRingColor: autocompleteVars.color.inputFocusRing,
      focusRingOffset: autocompleteVars.layout.inputFocusRingOffset,
    }),
  },
]);

export const label = style({
  vars: {
    ...autocompleteDefaults,
  },

  ...createFieldStackStyles({
    alignItems: 'start',
    gap: autocompleteVars.spacing.stackGap,
    inlineSize: autocompleteVars.layout.inputInlineSize,
  }),
  ...createFieldLabelStyles({
    color: autocompleteVars.color.label,
  }),
});

export const positioner = style({
  vars: {
    ...autocompleteDefaults,
  },

  ...createFloatingPositionerStyles(),
});

export const popup = style({
  ...createFloatingAnchoredSurfaceStyles({
    background: autocompleteVars.color.popupBackground,
    borderRadius: autocompleteVars.shape.popupCorner,
    foreground: autocompleteVars.color.popupForeground,
    outline: autocompleteVars.color.popupOutline,
    shadow: autocompleteVars.color.popupShadow,

    motion: {
      preset: 'none',
    },
  }),

  overflow: 'hidden',
});

export const list = style({
  ...createFloatingListStyles({
    maxBlockSize: autocompleteVars.size.listMaxBlockSize,
    paddingBlock: autocompleteVars.spacing.listPaddingBlock,
    scrollPaddingBlock: autocompleteVars.spacing.listScrollPaddingBlock,

    selectors: {
      [`&[data-empty]`]: {
        paddingBlock: autocompleteVars.spacing.zero,
        paddingInline: autocompleteVars.spacing.zero,
      },
    },
  }),
});

export const item = style([
  typography.body.large,
  createFloatingItemStyles({
    overflowWrap: 'anywhere',
    selectors: {
      ...autocompleteItemHighlightSelectors,
    },
  }),
]);

export const empty = style({
  selectors: {
    [`&:not(:empty)`]: {
      paddingBlock: autocompleteVars.spacing.emptyPaddingBlock,
      paddingInline: autocompleteVars.spacing.emptyPaddingInline,

      fontSize: sys.typography.body.medium.size,
      lineHeight: sys.typography.body.medium.lineHeight,
      color: autocompleteVars.color.emptyForeground,
    },
  },
});
