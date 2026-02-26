import { style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFieldLabelStyles,
  createFieldStackStyles,
  createFloatingPopupStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
  createTextInputStyles,
  floatingPanelMaxBlockSize,
} from '../_foundation';

const autocompleteItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
    backgroundColor: sys.color.content.base,
    insetInline: sys.spacing[4],
    borderRadius: '0.25rem',
  }).selectors ?? {};

export const input = style([
  typography.body.large,
  {
    ...createTextInputStyles({
      paddingInlineStart: sys.spacing[7],
      inlineSize: '100%',
      blockSize: sys.spacing[14],

      border: `1px solid ${sys.color.border.base}`,
      borderRadius: '0.375rem',
      backgroundColor: sys.color.surface.base,
      color: sys.color.content.base,
      outline: 'none',

      focus: {
        styles: {
          borderColor: sys.color.tone.primary,
          outline: `1px solid ${sys.color.tone.primary}`,
        },
      },
    }),
  },
]);

export const label = style({
  ...createFieldStackStyles({
    gap: sys.spacing[2],
  }),
  ...createFieldLabelStyles({
    color: sys.color.content.base,
  }),
});

export const positioner = style({
  ...createFloatingPositionerStyles({
    outline: '0',
  }),
});

export const popup = style({
  ...createFloatingPopupStyles({
    inlineSize: 'var(--anchor-width)',
    maxInlineSize: 'var(--available-width)',

    borderRadius: '0.375rem',
    backgroundColor: sys.color.surface.base,
    color: sys.color.content.base,
    lightOutline: sys.color.border.low,
    darkOutline: sys.color.border.low,
    darkOutlineOffset: '-1px',
    shadow: sys.elevation.moderate,

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
