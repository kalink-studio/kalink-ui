import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: sys.spacing[2],
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: sys.color.content.base,
  position: 'relative',
});

export const inputWrapper = style({
  position: 'relative',
  display: 'inline-block',
});

const actionButtonStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: sys.spacing[10],
  blockSize: sys.spacing[14],
  color: stateColor.mutedContent,
  border: 'none',
  paddingBlock: '0',
  paddingInline: '0',
  borderRadius: '0.25rem',
  background: 'none',
} as const;

const actionIconStyle = {
  inlineSize: sys.spacing[8],
  blockSize: sys.spacing[8],
} as const;

export const trigger = style(actionButtonStyle);

export const clear = style(actionButtonStyle);

export const input = style({
  boxSizing: 'border-box',
  paddingInlineStart: sys.spacing[7],
  paddingInlineEnd: calc.add(sys.spacing[4], sys.spacing[10]),
  marginBlock: '0',
  marginInline: '0',
  border: `1px solid ${sys.color.container.high}`,
  inlineSize: '16rem',
  blockSize: sys.spacing[14],
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,

  selectors: {
    [`&:focus`]: {
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
    [`${inputWrapper}:has(${clear}) &`]: {
      paddingInlineEnd: calc.add(
        sys.spacing[4],
        calc.multiply(sys.spacing[10], 2),
      ),
    },
  },
});

export const triggerIcon = style(actionIconStyle);

export const clearIcon = style(actionIconStyle);

export const empty = style({
  selectors: {
    [`&:not(:empty)`]: {
      fontSize: '0.925rem',
      lineHeight: '1rem',
      color: stateColor.mutedContent,
      paddingBlock: sys.spacing[8],
      paddingInline: sys.spacing[8],
    },
  },
});

export const actionButtons = style({
  boxSizing: 'border-box',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  insetBlockEnd: '0',
  blockSize: sys.spacing[14],
  insetInlineEnd: sys.spacing[4],
  borderRadius: '0.25rem',
  border: 'none',
  color: stateColor.mutedContent,
  paddingBlock: '0',
  paddingInline: '0',
});

export const positioner = style({
  outline: '0',
});

export const popup = style({
  boxSizing: 'border-box',
  borderRadius: '0.375rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  inlineSize: 'var(--anchor-width)',
  maxBlockSize: '23rem',
  maxInlineSize: 'var(--available-width)',
  transition: 'opacity 0.1s,\n    transform 0.1s',
  transformOrigin: 'var(--transform-origin)',
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: `1px solid ${sys.color.container.high}`,
      boxShadow: sys.elevation.moderate,
    },
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${sys.color.container.top}`,
      outlineOffset: '-1px',
    },
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'scale(0.95)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'scale(0.95)',
    },
  },
});

export const list = style({
  boxSizing: 'border-box',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  paddingBlock: sys.spacing[4],
  scrollPaddingBlock: sys.spacing[4],
  outline: '0',
  maxBlockSize: `min(${calc.multiply(sys.spacing[8], 23)}, var(--available-height))`,

  selectors: {
    [`&[data-empty]`]: {
      paddingBlock: '0',
      paddingInline: '0',
    },
  },
});

export const item = style({
  boxSizing: 'border-box',
  outline: '0',
  cursor: 'default',
  userSelect: 'none',
  paddingBlock: sys.spacing[4],
  paddingInlineStart: sys.spacing[8],
  paddingInlineEnd: sys.spacing[12],
  display: 'grid',
  gap: sys.spacing[4],
  alignItems: 'center',
  gridTemplateColumns: `${sys.spacing[6]} 1fr`,
  fontSize: '1rem',
  lineHeight: '1rem',

  selectors: {
    [`&[data-highlighted]`]: {
      zIndex: '0',
      position: 'relative',
      color: sys.color.container.base,
    },
    [`&[data-highlighted]::before`]: {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      insetBlock: '0',
      insetInline: sys.spacing[4],
      borderRadius: '0.25rem',
      backgroundColor: sys.color.content.base,
    },
  },
});

export const itemText = style({
  gridColumnStart: '2',
});

export const itemIndicator = style({
  gridColumnStart: '1',
});

export const itemIndicatorIcon = style({
  display: 'block',
  inlineSize: sys.spacing[6],
  blockSize: sys.spacing[6],
});

export const comboboxRecipe = recipe({
  base: input,
});
