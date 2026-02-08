import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: sys.spacing[2],
});

export const scrubArea = style({
  cursor: 'ew-resize',
  fontWeight: 'bold',
  userSelect: 'none',
});

export const scrubAreaCursor = style({
  filter: `drop-shadow(0 1px 1px ${stateColor.disabledContent})`,
});

export const label = style({
  cursor: 'ew-resize',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: sys.color.content.base,
});

export const group = style({
  display: 'flex',
});

export const input = style({
  boxSizing: 'border-box',
  marginBlock: '0',
  marginInline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  borderRadius: '0',
  borderBlockStart: `1px solid ${sys.color.container.high}`,
  borderBlockEnd: `1px solid ${sys.color.container.high}`,
  borderInlineStart: 'none',
  borderInlineEnd: 'none',
  inlineSize: '6rem',
  blockSize: sys.spacing[14],
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: 'normal',
  backgroundColor: 'transparent',
  color: sys.color.content.base,
  textAlign: 'center',
  fontVariantNumeric: 'tabular-nums',

  selectors: {
    [`&:focus`]: {
      zIndex: '1',
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
  },
});

const stepperButtonStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: sys.spacing[14],
  blockSize: sys.spacing[14],
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  border: `1px solid ${sys.color.container.high}`,
  borderRadius: '0.375rem',
  backgroundColor: sys.color.container.base,
  backgroundClip: 'padding-box',
  color: sys.color.content.base,
  userSelect: 'none',
} as const;

export const decrement = style({
  ...stepperButtonStyle,
  borderStartEndRadius: '0',
  borderEndEndRadius: '0',
  backgroundColor: sys.color.container.low,
});

export const increment = style({
  ...stepperButtonStyle,
  borderStartStartRadius: '0',
  borderEndStartRadius: '0',

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&:active`]: {
      backgroundColor: sys.color.container.low,
    },
  },
});

export const numberFieldRecipe = recipe({
  base: field,
});
