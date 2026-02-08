import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
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
  gap: sys.spacing[4],
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
  marginBlock: '0',
  marginInline: '0',
  paddingBlock: '1px',
  paddingInline: '1px',
  inlineSize: sys.spacing[14],
  blockSize: sys.spacing[10],
  borderRadius: sys.spacing[10],
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

  selectors: {
    [`&:active`]: {
      backgroundColor: switchVars.color.activeBackground,
    },
    [`&[data-checked]`]: {
      backgroundPositionX: '0%',
      '@media': {
        '(prefers-color-scheme: dark)': {
          boxShadow: 'none',
        },
      },
    },
    [`&[data-checked]:active`]: {
      backgroundColor: switchVars.color.checkedActiveBackground,
    },
    [`&:focus-visible::before`]: {
      content: "''",
      insetBlock: '0',
      insetInline: '0',
      position: 'absolute',
      borderRadius: 'inherit',
      outline: `2px solid ${switchVars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});

export const thumb = style({
  aspectRatio: '1 / 1',
  blockSize: '100%',
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

  selectors: {
    [`&[data-checked]`]: {
      translate: `${sys.spacing[8]} 0`,
    },
  },
});

export const switchRecipe = recipe({
  base: label,
});
