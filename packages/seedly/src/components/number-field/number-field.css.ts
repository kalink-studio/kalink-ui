import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Field = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '0.25rem',
});

export const ScrubArea = style({
  cursor: 'ew-resize',
  fontWeight: 'bold',
  userSelect: 'none',
});

export const ScrubAreaCursor = style({
  filter: 'drop-shadow(0 1px 1px #0008)',
});

export const Label = style({
  cursor: 'ew-resize',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
  color: 'var(--color-gray-900)',
});

export const Group = style({
  display: 'flex',
});

export const Input = style({
  boxSizing: 'border-box',
  margin: '0',
  padding: '0',
  borderRadius: '0',
  borderTop: '1px solid var(--color-gray-200)',
  borderBottom: '1px solid var(--color-gray-200)',
  borderLeft: 'none',
  borderRight: 'none',
  width: '6rem',
  height: '2.5rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: 'normal',
  backgroundColor: 'transparent',
  color: 'var(--color-gray-900)',
  textAlign: 'center',
  fontVariantNumeric: 'tabular-nums',
});
globalStyle(`${Input}:focus`, {
  zIndex: '1',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Decrement = style({
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
});

export const Increment = style({
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
});

globalStyle(
  `${Decrement},
${Increment}`,
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
    border: '1px solid var(--color-gray-200)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-gray-50)',
    backgroundClip: 'padding-box',
    color: 'var(--color-gray-900)',
    userSelect: 'none',
  },
);
globalStyle(
  `${Decrement},
${Increment}:hover`,
  {
    '@media': {
      '(hover: hover)': {
        backgroundColor: 'var(--color-gray-100)',
      },
    },
  },
);
globalStyle(
  `${Decrement},
${Increment}:active`,
  {
    backgroundColor: 'var(--color-gray-100)',
  },
);

export const NumberFieldRecipe = recipe({
  base: Field,
});
