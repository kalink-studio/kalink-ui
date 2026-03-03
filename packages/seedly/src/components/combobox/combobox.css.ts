import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { stateColor, sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';
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

export const comboboxVars = createThemeContract({
  color: {
    actionButtonForeground: null,
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
  spacing: {
    actionButtonInsetInlineEnd: null,
    emptyPaddingBlock: null,
    emptyPaddingInline: null,
    inputPaddingInlineEnd: null,
    inputPaddingInlineEndWithClear: null,
    inputPaddingInlineStart: null,
    itemHighlightInsetInline: null,
    itemPaddingBlock: null,
    itemPaddingInline: null,
    listPaddingBlock: null,
    listScrollPaddingBlock: null,
    stackGap: null,
    zero: null,
  },
  shape: {
    actionButtonCorner: null,
    inputCorner: null,
    itemHighlightCorner: null,
    popupCorner: null,
  },
  size: {
    actionButtonSize: null,
    inputBlockSize: null,
    listMaxBlockSize: null,
  },
});

const comboboxDefaults = assignVars(comboboxVars, {
  color: {
    actionButtonForeground: stateColor.mutedContent,
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
    actionButtonCorner: sys.shape.corner.small,
    inputCorner: sys.shape.corner.medium,
    itemHighlightCorner: sys.shape.corner.small,
    popupCorner: sys.shape.corner.medium,
  },
  size: {
    actionButtonSize: sys.spacing[14],
    inputBlockSize: sys.spacing[14],
    listMaxBlockSize: floatingPanelMaxBlockSize,
  },
  spacing: {
    actionButtonInsetInlineEnd: sys.spacing[4],
    emptyPaddingBlock: sys.spacing[8],
    emptyPaddingInline: sys.spacing[8],
    inputPaddingInlineEnd: calc.add(sys.spacing[4], sys.spacing[10]),
    inputPaddingInlineEndWithClear: calc.add(
      sys.spacing[4],
      calc.multiply(sys.spacing[10], 2),
    ),
    inputPaddingInlineStart: sys.spacing[4],
    itemHighlightInsetInline: sys.spacing[4],
    itemPaddingBlock: sys.spacing[2],
    itemPaddingInline: sys.spacing[8],
    listPaddingBlock: sys.spacing[2],
    listScrollPaddingBlock: sys.spacing[2],
    stackGap: sys.spacing[2],
    zero: sys.spacing[0],
  },
});

export const label = style({
  '@layer': {
    [components]: {
      ...createFieldStackStyles({
        alignItems: 'start',
        gap: comboboxVars.spacing.stackGap,
        inlineSize: comboboxVars.layout.inputInlineSize,
      }),
      ...createFieldLabelStyles({
        color: comboboxVars.color.label,
      }),
      position: 'relative',
      vars: {
        ...comboboxDefaults,
      },
    },
  },
});

export const inputWrapper = style({
  '@layer': {
    [components]: {
      display: 'block',
      inlineSize: '100%',
      minInlineSize: '0',
      position: 'relative',
    },
  },
});

const comboboxItemHighlightSelectors =
  createInsetHighlightStyles({
    backgroundColor: comboboxVars.color.itemHighlightedBackground,
    borderRadius: comboboxVars.shape.itemHighlightCorner,
    insetInline: comboboxVars.spacing.itemHighlightInsetInline,
    textColor: comboboxVars.color.itemHighlightedForeground,
  }).selectors ?? {};

export const trigger = style({ '@layer': { [components]: {} } });

export const clear = style({ '@layer': { [components]: {} } });

export const input = style([
  typography.body.large,
  {
    '@layer': {
      [components]: {
        ...createFieldTextInputStyles({
          backgroundColor: comboboxVars.color.inputBackground,
          blockSize: comboboxVars.size.inputBlockSize,
          borderColor: comboboxVars.color.inputBorder,
          borderRadius: comboboxVars.shape.inputCorner,
          focusRingColor: comboboxVars.color.inputFocusRing,
          focusRingOffset: comboboxVars.layout.inputFocusRingOffset,
          foreground: comboboxVars.color.inputForeground,
          inlineSize: comboboxVars.layout.inputInlineSize,
          paddingInlineEnd: comboboxVars.spacing.inputPaddingInlineEnd,
          paddingInlineStart: comboboxVars.spacing.inputPaddingInlineStart,
          selectors: {
            [`${inputWrapper}:has(${clear}) &`]: {
              paddingInlineEnd:
                comboboxVars.spacing.inputPaddingInlineEndWithClear,
            },
          },
        }),
      },
    },
  },
]);

export const empty = style([
  typography.body.medium,
  {
    '@layer': {
      [components]: {
        selectors: {
          [`&:not(:empty)`]: {
            paddingBlock: comboboxVars.spacing.emptyPaddingBlock,
            paddingInline: comboboxVars.spacing.emptyPaddingInline,
            fontSize: sys.typography.body.medium.size,
            lineHeight: sys.typography.body.medium.lineHeight,
            color: comboboxVars.color.emptyForeground,
          },
        },
      },
    },
  },
]);

export const actionButtons = style({
  '@layer': {
    [components]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      blockSize: comboboxVars.size.actionButtonSize,
      paddingBlock: comboboxVars.spacing.zero,
      paddingInline: comboboxVars.spacing.zero,
      position: 'absolute',
      insetBlockEnd: comboboxVars.spacing.zero,
      insetInlineEnd: comboboxVars.spacing.actionButtonInsetInlineEnd,
      color: comboboxVars.color.actionButtonForeground,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: comboboxVars.shape.actionButtonCorner,
    },
  },
});

export const positioner = style({
  '@layer': {
    [components]: {
      ...createFloatingPositionerStyles(),
      vars: {
        ...comboboxDefaults,
      },
    },
  },
});

export const popup = style({
  '@layer': {
    [components]: {
      ...createFloatingAnchoredSurfaceStyles({
        background: comboboxVars.color.popupBackground,
        borderRadius: comboboxVars.shape.popupCorner,
        foreground: comboboxVars.color.popupForeground,
        motion: {
          preset: 'scaleSoft',
        },
        outline: comboboxVars.color.popupOutline,
        shadow: comboboxVars.color.popupShadow,
      }),
      overflow: 'hidden',
    },
  },
});

export const list = style({
  '@layer': {
    [components]: {
      ...createFloatingListStyles({
        maxBlockSize: comboboxVars.size.listMaxBlockSize,
        paddingBlock: comboboxVars.spacing.listPaddingBlock,
        scrollPaddingBlock: comboboxVars.spacing.listScrollPaddingBlock,
        selectors: {
          [`&[data-empty]`]: {
            paddingBlock: comboboxVars.spacing.zero,
            paddingInline: comboboxVars.spacing.zero,
          },
        },
      }),
    },
  },
});

export const item = style([
  typography.body.medium,
  {
    '@layer': {
      [components]: createFloatingItemStyles({
        preset: 'listboxWithIndicator',
        paddingBlock: comboboxVars.spacing.itemPaddingBlock,
        paddingInline: comboboxVars.spacing.itemPaddingInline,
        selectors: {
          ...comboboxItemHighlightSelectors,
        },
      }),
    },
  },
]);

export const itemText = style({
  '@layer': {
    [components]: {
      gridColumnStart: '2',
      minInlineSize: '0',
      overflowWrap: 'anywhere',
    },
  },
});

export const itemIndicator = style({
  '@layer': {
    [components]: {
      gridColumnStart: '1',
    },
  },
});
