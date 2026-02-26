import { style } from '@vanilla-extract/css';

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
        paddingBlock: '0',
        paddingInline: '0',
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
      paddingBlock: sys.spacing[8],
      paddingInline: sys.spacing[8],

      fontSize: sys.typography.body.medium.size,
      lineHeight: sys.typography.body.medium.lineHeight,
      color: stateColor.mutedContent,
    },
  },
});
