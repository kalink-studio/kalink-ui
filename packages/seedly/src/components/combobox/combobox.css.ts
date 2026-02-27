import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

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
} from '../_foundation';

export const comboboxVars = createThemeContract({
  spacing: {
    itemHighlightInsetInline: null,
    inputPaddingInlineEnd: null,
    inputPaddingInlineEndWithClear: null,
    emptyPaddingBlock: null,
    emptyPaddingInline: null,
    actionButtonSize: null,
    actionButtonInsetInlineEnd: null,
    zero: null,
  },
  shape: {
    actionButtonCorner: null,
  },
});

const comboboxSpacingDefaults = assignVars(comboboxVars.spacing, {
  itemHighlightInsetInline: sys.spacing[4],
  inputPaddingInlineEnd: calc.add(sys.spacing[4], sys.spacing[10]),
  inputPaddingInlineEndWithClear: calc.add(
    sys.spacing[4],
    calc.multiply(sys.spacing[10], 2),
  ),
  emptyPaddingBlock: sys.spacing[8],
  emptyPaddingInline: sys.spacing[8],
  actionButtonSize: sys.spacing[14],
  actionButtonInsetInlineEnd: sys.spacing[4],
  zero: sys.spacing[0],
});

const comboboxShapeDefaults = assignVars(comboboxVars.shape, {
  actionButtonCorner: sys.shape.corner.small,
});

export const label = style({
  ...createFieldStackStyles({
    alignItems: 'start',
    inlineSize: '100%',
  }),
  ...createFieldLabelStyles(),
  position: 'relative',
  vars: {
    ...comboboxSpacingDefaults,
    ...comboboxShapeDefaults,
  },
});

export const inputWrapper = style({
  display: 'block',
  inlineSize: '100%',
  minInlineSize: '0',
  position: 'relative',
});

const comboboxItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
    insetInline: comboboxVars.spacing.itemHighlightInsetInline,
  }).selectors ?? {};

export const trigger = style({});

export const clear = style({});

export const input = style([
  typography.body.large,
  {
    ...createFieldTextInputStyles({
      paddingInlineEnd: comboboxVars.spacing.inputPaddingInlineEnd,
      selectors: {
        [`${inputWrapper}:has(${clear}) &`]: {
          paddingInlineEnd: comboboxVars.spacing.inputPaddingInlineEndWithClear,
        },
      },
    }),
  },
]);

export const empty = style({
  selectors: {
    [`&:not(:empty)`]: {
      paddingBlock: comboboxVars.spacing.emptyPaddingBlock,
      paddingInline: comboboxVars.spacing.emptyPaddingInline,
      fontSize: sys.typography.body.medium.size,
      lineHeight: sys.typography.body.medium.lineHeight,
      color: stateColor.mutedContent,
    },
  },
});

export const actionButtons = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: comboboxVars.spacing.actionButtonSize,
  paddingBlock: comboboxVars.spacing.zero,
  paddingInline: comboboxVars.spacing.zero,
  position: 'absolute',
  insetBlockEnd: comboboxVars.spacing.zero,
  insetInlineEnd: comboboxVars.spacing.actionButtonInsetInlineEnd,
  color: stateColor.mutedContent,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: comboboxVars.shape.actionButtonCorner,
});

export const positioner = style({
  ...createFloatingPositionerStyles(),
  vars: {
    ...comboboxSpacingDefaults,
    ...comboboxShapeDefaults,
  },
});

export const popup = style({
  ...createFloatingAnchoredSurfaceStyles({
    motion: {
      preset: 'scaleSoft',
    },
  }),
  overflow: 'hidden',
});

export const list = style({
  ...createFloatingListStyles({
    selectors: {
      [`&[data-empty]`]: {
        paddingBlock: comboboxVars.spacing.zero,
        paddingInline: comboboxVars.spacing.zero,
      },
    },
  }),
});

export const item = style([
  typography.body.large,
  createFloatingItemStyles({
    preset: 'listboxWithIndicator',
    selectors: {
      ...comboboxItemHighlightSelectors,
    },
  }),
]);

export const itemText = style({
  gridColumnStart: '2',
  minInlineSize: '0',
  overflowWrap: 'anywhere',
});

export const itemIndicator = style({
  gridColumnStart: '1',
});
