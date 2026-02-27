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
} from '../_foundation';

export const autocompleteVars = createThemeContract({
  spacing: {
    itemHighlightInsetInline: null,
    emptyPaddingBlock: null,
    emptyPaddingInline: null,
    zero: null,
  },
});

const autocompleteSpacingDefaults = assignVars(autocompleteVars.spacing, {
  itemHighlightInsetInline: sys.spacing[4],
  emptyPaddingBlock: sys.spacing[8],
  emptyPaddingInline: sys.spacing[8],
  zero: sys.spacing[0],
});

const autocompleteItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
    insetInline: autocompleteVars.spacing.itemHighlightInsetInline,
  }).selectors ?? {};

export const input = style([
  typography.body.large,
  {
    ...createFieldTextInputStyles(),
  },
]);

export const label = style({
  ...createFieldStackStyles(),
  ...createFieldLabelStyles(),
  vars: {
    ...autocompleteSpacingDefaults,
  },
});

export const positioner = style({
  ...createFloatingPositionerStyles(),
  vars: {
    ...autocompleteSpacingDefaults,
  },
});

export const popup = style({
  ...createFloatingAnchoredSurfaceStyles({
    motion: {
      preset: 'none',
    },
  }),
  overflow: 'hidden',
});

export const list = style({
  ...createFloatingListStyles({
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
      color: stateColor.mutedContent,
    },
  },
});
