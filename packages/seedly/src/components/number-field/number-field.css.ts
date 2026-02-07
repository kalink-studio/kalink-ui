import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
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
  margin: '0',
  padding: '0',
  borderRadius: '0',
  borderTop: `1px solid ${sys.color.container.high}`,
  borderBottom: `1px solid ${sys.color.container.high}`,
  borderLeft: 'none',
  borderRight: 'none',
  width: '6rem',
  height: '2.5rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: 'normal',
  backgroundColor: 'transparent',
  color: sys.color.content.base,
  textAlign: 'center',
  fontVariantNumeric: 'tabular-nums',
});
globalStyle(`${input}:focus`, {
  zIndex: '1',
  outline: `2px solid ${sys.color.tone.primary}`,
  outlineOffset: '-1px',
});

export const decrement = style({
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
});

export const increment = style({
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
});

globalStyle(
  `${decrement},
${increment}`,
  {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    margin: '0',
    outline: '0',
    padding: '0',
    border: `1px solid ${sys.color.container.high}`,
    borderRadius: '0.375rem',
    backgroundColor: sys.color.container.base,
    backgroundClip: 'padding-box',
    color: sys.color.content.base,
    userSelect: 'none',
  },
);
globalStyle(
  `${decrement},
${increment}:hover`,
  {
    '@media': {
      '(hover: hover)': {
        backgroundColor: sys.color.container.low,
      },
    },
  },
);
globalStyle(
  `${decrement},
${increment}:active`,
  {
    backgroundColor: sys.color.container.low,
  },
);

export const numberFieldRecipe = recipe({
  base: field,
});
