import { style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFieldTextInputStyles,
  createFieldLabelStyles,
  createFieldStackStyles,
  createFloatingPopupStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
  floatingPanelMaxBlockSize,
} from '../_foundation';

const autocompleteItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
    insetInline: sys.spacing[4],
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
});

export const positioner = style({
  ...createFloatingPositionerStyles(),
});

export const popup = style({
  ...createFloatingPopupStyles({
    inlineSize: 'var(--anchor-width)',
    maxInlineSize: 'var(--available-width)',

    transition: null,

    includeStartingStyle: false,
    includeEndingStyle: false,
  }),
  overflow: 'hidden',
});

export const list = style({
  maxBlockSize: floatingPanelMaxBlockSize,
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',
  paddingBlock: sys.spacing[4],
  scrollPaddingBlock: sys.spacing[4],

  outline: '0',

  selectors: {
    [`&[data-empty]`]: {
      paddingBlock: '0',
      paddingInline: '0',
    },
  },
});

export const item = style([
  typography.body.large,
  {
    display: 'flex',
    minInlineSize: '0',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],

    overflowWrap: 'anywhere',

    outline: '0',

    cursor: 'default',
    userSelect: 'none',

    selectors: {
      ...autocompleteItemHighlightSelectors,
    },
  },
]);
export const empty = style({
  selectors: {
    [`&:not(:empty)`]: {
      paddingBlock: sys.spacing[8],
      paddingInline: sys.spacing[8],

      fontSize: sys.typography.body.medium.size,
      lineHeight: sys.typography.body.medium.lineHeight,
      color: stateColor.mutedContent,
    },
  },
});
