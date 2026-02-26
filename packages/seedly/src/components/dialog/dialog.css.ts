import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { stateColor, sys, typography } from '../../styles';

export const dialogVars = createThemeContract({
  color: {
    backdrop: null,
    popupBackground: null,
    popupForeground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    description: null,
  },
  shape: {
    popupCorner: null,
  },
});

const dialogColorDefaults = assignVars(dialogVars.color, {
  backdrop: sys.color.content.base,
  popupBackground: sys.color.container.base,
  popupForeground: sys.color.content.base,
  popupOutlineLight: sys.color.border.low,
  popupOutlineDark: sys.color.border.low,
  description: stateColor.mutedContent,
});

const dialogShapeDefaults = assignVars(dialogVars.shape, {
  popupCorner: '0.5rem',
});

export const button = style([
  typography.label.large,
  {
    blockSize: sys.spacing[14],
  },
]);

export const backdrop = style({
  minBlockSize: '100dvh',
  position: 'fixed',
  insetBlock: '0',
  insetInline: '0',
  backgroundColor: dialogVars.color.backdrop,
  opacity: '0.2',
  transition: `opacity ${sys.motion.duration.short[4]} ${sys.motion.easing.decelerate.emphasized}`,
  '@supports': {
    '(-webkit-touch-callout: none)': {
      position: 'absolute',
    },
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      opacity: '0.35',
    },
  },
  vars: {
    ...dialogColorDefaults,
    ...dialogShapeDefaults,
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
    },
  },
});

export const popup = style({
  inlineSize: '24rem',
  maxInlineSize: calc.subtract('100vw', sys.spacing[15]),
  marginBlockStart: calc.negate(sys.spacing[12]),
  paddingBlock: sys.spacing[10],
  paddingInline: sys.spacing[10],
  position: 'fixed',
  insetBlockStart: '50%',
  insetInlineStart: '50%',
  color: dialogVars.color.popupForeground,
  backgroundColor: dialogVars.color.popupBackground,
  borderRadius: dialogVars.shape.popupCorner,
  outline: `1px solid ${dialogVars.color.popupOutlineLight}`,
  transform: 'translate(-50%, -50%)',
  transition: 'all 150ms',
  '@media': {
    '(prefers-color-scheme: dark)': {
      outline: `1px solid ${dialogVars.color.popupOutlineDark}`,
    },
  },
  vars: {
    ...dialogColorDefaults,
    ...dialogShapeDefaults,
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
      transform: 'translate(-50%, -50%) scale(0.9)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'translate(-50%, -50%) scale(0.9)',
    },
  },
});

export const title = style([
  typography.title.large,
  {
    marginBlockStart: calc.negate(sys.spacing[3]),
    marginBlockEnd: sys.spacing[2],
  },
]);

export const description = style([
  typography.body.large,
  {
    marginBlock: `0 ${sys.spacing[10]}`,
    marginInline: '0',
    color: dialogVars.color.description,
  },
]);

export const actions = style({
  display: 'flex',
  justifyContent: 'end',
  gap: sys.spacing[8],
});
