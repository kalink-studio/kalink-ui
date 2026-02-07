import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const switchVars = createThemeContract({
  color: {
    label: null,
    activeBackground: null,
    checkedActiveBackground: null,
    focusRing: null,
    thumbBackground: null,
  },
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: switchVars.color.label,
  vars: assignVars(switchVars.color, {
    label: sys.color.content.base,
    activeBackground: sys.color.container.low,
    checkedActiveBackground: stateColor.disabledContent,
    focusRing: sys.color.tone.primary,
    thumbBackground: sys.color.surface.bright,
  }),
});

export const switchRoot = style({
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
  backgroundImage: `linear-gradient(to right, ${sys.color.content.base} 35%, ${sys.color.container.high} 65%)`,
  backgroundSize: '6.5rem 100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  transitionProperty: 'background-position, box-shadow',
  transitionTimingFunction: sys.motion.easing.decelerate.emphasized,
  transitionDuration: sys.motion.duration.short[3],
  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow: sys.elevation.minimal,
      outlineColor: sys.color.container.high,
    },
    '(prefers-color-scheme: dark)': {
      boxShadow: sys.elevation.minimal,
      outlineColor: stateColor.subtleContent,
      backgroundImage: `linear-gradient(\n      to right,\n      ${stateColor.disabledContent} 35%,\n      ${sys.color.container.high} 65%\n    )`,
    },
  },
});
globalStyle(`${switchRoot}:active`, {
  backgroundColor: switchVars.color.activeBackground,
});
globalStyle(`${switchRoot}[data-checked]`, {
  backgroundPositionX: '0%',
});
globalStyle(`${switchRoot}[data-checked]:active`, {
  backgroundColor: switchVars.color.checkedActiveBackground,
});
globalStyle(`${switchRoot}[data-checked]`, {
  '@media': {
    '(prefers-color-scheme: dark)': {
      boxShadow: 'none',
    },
  },
});
globalStyle(`${switchRoot}:focus-visible::before`, {
  content: "''",
  inset: '0',
  position: 'absolute',
  borderRadius: 'inherit',
  outline: `2px solid ${switchVars.color.focusRing}`,
  outlineOffset: '2px',
});

export const thumb = style({
  aspectRatio: '1 / 1',
  height: '100%',
  borderRadius: '100%',
  backgroundColor: switchVars.color.thumbBackground,
  transition: 'translate 150ms ease',
  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow: sys.elevation.high,
    },
    '(prefers-color-scheme: dark)': {
      boxShadow: sys.elevation.peak,
    },
  },
});
globalStyle(`${thumb}[data-checked]`, {
  translate: '1rem 0',
});

export const switchRecipe = recipe({
  base: label,
});
