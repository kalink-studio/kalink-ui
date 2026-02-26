import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

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

export const label = style({
  ...createFieldStackStyles({
    alignItems: 'start',
    inlineSize: '100%',
  }),
  ...createFieldLabelStyles(),
  position: 'relative',
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
    insetInline: sys.spacing[4],
  }).selectors ?? {};

export const trigger = style({});

export const clear = style({});

export const input = style([
  typography.body.large,
  {
    ...createFieldTextInputStyles({
      paddingInlineEnd: calc.add(sys.spacing[4], sys.spacing[10]),
      selectors: {
        [`${inputWrapper}:has(${clear}) &`]: {
          paddingInlineEnd: calc.add(
            sys.spacing[4],
            calc.multiply(sys.spacing[10], 2),
          ),
        },
      },
    }),
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

export const actionButtons = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: sys.spacing[14],
  paddingBlock: '0',
  paddingInline: '0',
  position: 'absolute',
  insetBlockEnd: '0',
  insetInlineEnd: sys.spacing[4],
  color: stateColor.mutedContent,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: sys.shape.corner.small,
});

export const positioner = style({
  ...createFloatingPositionerStyles(),
});

export const popup = style({
  ...createFloatingPopupStyles({
    inlineSize: 'var(--anchor-width)',
    maxInlineSize: 'var(--available-width)',
    transition: `opacity ${sys.motion.duration.short[2]} ${sys.motion.easing.standard},\n    transform ${sys.motion.duration.short[2]} ${sys.motion.easing.standard}`,
    startingStyle: {
      opacity: '0',
      transform: 'scale(0.95)',
    },
    endingStyle: {
      opacity: '0',
      transform: 'scale(0.95)',
    },
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
    display: 'grid',
    alignItems: 'center',
    gap: sys.spacing[4],
    gridTemplateColumns: `${sys.spacing[6]} 1fr`,
    minInlineSize: '0',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],
    outline: '0',
    cursor: 'default',
    userSelect: 'none',

    selectors: {
      ...comboboxItemHighlightSelectors,
    },
  },
]);

export const itemText = style({
  gridColumnStart: '2',
  minInlineSize: '0',
  overflowWrap: 'anywhere',
});

export const itemIndicator = style({
  gridColumnStart: '1',
});
