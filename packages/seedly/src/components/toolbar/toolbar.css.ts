import { style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';

export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: sys.spacing[1],
  rowGap: sys.spacing[1],
  inlineSize: '100%',
});

export const group = style({
  display: 'flex',
  gap: sys.spacing[2],
});

export const button = style([
  typography.label.medium,
  {
    minInlineSize: sys.spacing[12],
    blockSize: sys.spacing[12],
    borderWidth: '0',

    selectors: {
      '&:hover:not(:disabled):not([data-disabled]):not([data-loading])': {
        '@media': {
          '(hover: hover)': {
            backgroundColor: sys.color.container.low,
          },
        },
      },
      '&:active:not(:disabled):not([data-disabled]):not([data-loading])': {
        backgroundColor: sys.color.container.high,
      },
      '&[data-pressed]': {
        backgroundColor: sys.color.container.low,
        color: sys.color.content.base,
      },
      '&:focus-visible': {
        outline: `2px solid ${sys.color.tone.primary}`,
        outlineOffset: '-1px',
        backgroundColor: 'transparent',
      },
      [`&[aria-pressed]`]: {
        paddingBlock: '0',
        paddingInline: sys.spacing[6],
      },
    },
  },
]);

export const separator = style({
  inlineSize: '1px',
  blockSize: sys.spacing[8],
  marginBlock: sys.spacing[2],
  marginInline: sys.spacing[2],
  backgroundColor: sys.color.border.high,
});

export const link = style([
  typography.body.medium,
  {
    alignSelf: 'center',
    flex: '0 0 auto',
    marginInline: `auto ${sys.spacing[6]}`,
    color: stateColor.mutedContent,
    textDecoration: 'none',

    selectors: {
      [`&:focus-visible`]: {
        outline: `2px solid ${sys.color.tone.primary}`,
        outlineOffset: '-2px',
        borderRadius: 'var(--radius-sm)',
      },
      [`&:hover`]: {
        '@media': {
          '(hover: hover)': {
            color: sys.color.tone.primary,
          },
        },
      },
    },
  },
]);
