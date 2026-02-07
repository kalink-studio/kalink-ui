import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Label = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
});

export const Switch = style({
  position: 'relative',
  display: 'flex',
  appearance: 'none',
  border: '0',
  margin: '0',
  padding: '1px',
  width: '2.5rem',
  height: '1.5rem',
  borderRadius: '1.5rem',
  outline: '1px solid',
  outlineOffset: '-1px',
  backgroundColor: 'transparent',
  backgroundImage:
    'linear-gradient(to right, var(--color-gray-700) 35%, var(--color-gray-200) 65%)',
  backgroundSize: '6.5rem 100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  transitionProperty: 'background-position, box-shadow',
  transitionTimingFunction: 'cubic-bezier(0.26, 0.75, 0.38, 0.45)',
  transitionDuration: '125ms',
  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow: 'var(--color-gray-200) 0 1.5px 2px inset',
      outlineColor: 'var(--color-gray-200)',
    },
    '(prefers-color-scheme: dark)': {
      boxShadow: 'rgb(0 0 0 / 75%) 0 1.5px 2px inset',
      outlineColor: 'rgb(255 255 255 / 15%)',
      backgroundImage:
        'linear-gradient(\n      to right,\n      var(--color-gray-500) 35%,\n      var(--color-gray-200) 65%\n    )',
    },
  },
});
globalStyle(`${Switch}:active`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${Switch}[data-checked]`, {
  backgroundPositionX: '0%',
});
globalStyle(`${Switch}[data-checked]:active`, {
  backgroundColor: 'var(--color-gray-500)',
});
globalStyle(`${Switch}[data-checked]`, {
  '@media': {
    '(prefers-color-scheme: dark)': {
      boxShadow: 'none',
    },
  },
});
globalStyle(`${Switch}:focus-visible::before`, {
  content: "''",
  inset: '0',
  position: 'absolute',
  borderRadius: 'inherit',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '2px',
});

export const Thumb = style({
  aspectRatio: '1 / 1',
  height: '100%',
  borderRadius: '100%',
  backgroundColor: 'white',
  transition: 'translate 150ms ease',
  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow:
        '0 0 1px 1px var(--color-gray-100),\n      0 1px 1px var(--color-gray-100),\n      1px 2px 4px -1px var(--color-gray-100)',
    },
    '(prefers-color-scheme: dark)': {
      boxShadow:
        '0 0 1px 1px rgb(0 0 0 / 25%),\n      0 1px 1px rgb(0 0 0 / 25%),\n      1px 2px 4px -1px rgb(0 0 0 / 25%)',
    },
  },
});
globalStyle(`${Thumb}[data-checked]`, {
  translate: '1rem 0',
});

export const SwitchRecipe = recipe({
  base: Label,
});
