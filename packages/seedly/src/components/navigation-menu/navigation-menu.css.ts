import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { stateColor, sys } from '../../styles';

export const root = style({
  backgroundColor: sys.color.container.base,
  borderRadius: '0.5rem',
  paddingBlock: sys.spacing[2],
  paddingInline: sys.spacing[2],
  color: sys.color.content.base,
  minInlineSize: 'max-content',
});

export const list = style({
  display: 'flex',
  position: 'relative',
  listStyle: 'none',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
});

export const trigger = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: sys.spacing[3],
  blockSize: sys.spacing[14],
  paddingBlock: '0',
  paddingInline: sys.spacing[7],
  marginBlock: '0',
  marginInline: '0',
  outline: '0',
  border: 'none',
  borderRadius: '0.375rem',
  backgroundColor: sys.color.container.base,
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: sys.color.content.base,
  userSelect: 'none',
  textDecoration: 'none',
  '@media': {
    '(max-width: 500px)': {
      fontSize: '0.925rem',
      paddingBlock: '0',
      paddingInline: sys.spacing[4],
    },
  },

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&[data-popup-open]`]: {
      backgroundColor: sys.color.container.low,
    },
    [`&:focus-visible`]: {
      position: 'relative',
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
  },
});

export const icon = style({
  transition: 'transform 0.2s ease',

  selectors: {
    [`&[data-popup-open]`]: {
      transform: 'rotate(180deg)',
    },
  },
});

export const positioner = style({
  boxSizing: 'border-box',
  transitionProperty: 'top, left, right, bottom',
  transitionDuration: 'var(--duration)',
  transitionTimingFunction: 'var(--easing)',
  inlineSize: 'var(--positioner-width)',
  blockSize: 'var(--positioner-height)',
  maxInlineSize: 'var(--available-width)',
  vars: {
    '--easing': sys.motion.easing.decelerate.emphasized,
    '--duration': sys.motion.duration.medium[4],
  },

  selectors: {
    [`&::before`]: {
      content: "''",
      position: 'absolute',
    },
    [`&[data-side='top']::before`]: {
      left: '0',
      right: '0',
      bottom: calc.negate(sys.spacing[5]),
      blockSize: sys.spacing[5],
    },
    [`&[data-side='bottom']::before`]: {
      left: '0',
      right: '0',
      top: calc.negate(sys.spacing[5]),
      blockSize: sys.spacing[5],
    },
    [`&[data-side='left']::before`]: {
      top: '0',
      bottom: '0',
      right: calc.negate(sys.spacing[5]),
      inlineSize: sys.spacing[5],
    },
    [`&[data-side='right']::before`]: {
      top: '0',
      bottom: '0',
      left: calc.negate(sys.spacing[5]),
      inlineSize: sys.spacing[5],
    },
    [`&[data-instant]`]: {
      transition: 'none',
    },
  },
});

export const popup = style({
  position: 'relative',
  boxSizing: 'border-box',
  borderRadius: '0.5rem',
  backgroundColor: sys.color.surface.base,
  color: sys.color.content.base,
  transformOrigin: 'var(--transform-origin)',
  transitionProperty: 'opacity, transform, inline-size, block-size',
  transitionDuration: 'var(--duration)',
  transitionTimingFunction: 'var(--easing)',
  inlineSize: 'var(--popup-width)',
  blockSize: 'var(--popup-height)',
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
      transform: 'scale(0.9)',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
      transform: 'scale(0.9)',
      transitionTimingFunction: 'ease',
      transitionDuration: '0.15s',
    },
  },
});

export const content = style({
  boxSizing: 'border-box',
  transition:
    'opacity calc(var(--duration) * 0.5) ease,\n    transform var(--duration) var(--easing)',
  paddingBlock: sys.spacing[10],
  paddingInline: sys.spacing[10],
  inlineSize: calc.subtract('100vw', sys.spacing[14]),
  blockSize: '100%',
  '@media': {
    '(min-width: 500px)': {
      inlineSize: 'max-content',
      minInlineSize: '400px',
    },
  },

  selectors: {
    [`&[data-starting-style]`]: {
      opacity: '0',
    },
    [`&[data-ending-style]`]: {
      opacity: '0',
    },
    [`&[data-starting-style][data-activation-direction='left']`]: {
      transform: 'translateX(-50%)',
    },
    [`&[data-starting-style][data-activation-direction='right']`]: {
      transform: 'translateX(50%)',
    },
    [`&[data-ending-style][data-activation-direction='left']`]: {
      transform: 'translateX(50%)',
    },
    [`&[data-ending-style][data-activation-direction='right']`]: {
      transform: 'translateX(-50%)',
    },
  },
});

export const viewport = style({
  position: 'relative',
  overflow: 'hidden',
  inlineSize: '100%',
  blockSize: '100%',
});

export const gridLinkList = style({
  display: 'grid',
  gridTemplateColumns: '12rem 12rem',
  listStyle: 'none',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  '@media': {
    '(max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const flexLinkList = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxInlineSize: '400px',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  listStyle: 'none',
});

export const linkCard = style({
  boxSizing: 'border-box',
  display: 'block',
  paddingBlock: sys.spacing[4],
  paddingInline: sys.spacing[4],
  borderRadius: '0.375rem',
  textDecoration: 'none',
  color: 'inherit',
  border: 'none',
  backgroundColor: 'transparent',
  '@media': {
    '(min-width: 425px)': {
      paddingBlock: sys.spacing[6],
      paddingInline: sys.spacing[6],
    },
  },

  selectors: {
    [`&:hover`]: {
      '@media': {
        '(hover: hover)': {
          backgroundColor: sys.color.container.low,
        },
      },
    },
    [`&:focus-visible`]: {
      position: 'relative',
      outline: `2px solid ${sys.color.tone.primary}`,
      outlineOffset: '-1px',
    },
  },
});

export const linkTitle = style({
  marginBlockStart: '0',
  marginBlockEnd: sys.spacing[2],
  marginInline: '0',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.25rem',
});

export const linkDescription = style({
  marginBlock: '0',
  marginInline: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: stateColor.disabledContent,
});

export const arrow = style({
  display: 'flex',
  transition: 'left calc(var(--duration)) var(--easing)',

  selectors: {
    [`&[data-side='top']`]: {
      bottom: calc.negate(sys.spacing[4]),
      rotate: '180deg',
    },
    [`&[data-side='bottom']`]: {
      top: calc.negate(sys.spacing[4]),
      rotate: '0deg',
    },
    [`&[data-side='left']`]: {
      right: calc.negate(sys.spacing[7]),
      rotate: '90deg',
    },
    [`&[data-side='right']`]: {
      left: calc.negate(sys.spacing[7]),
      rotate: '-90deg',
    },
  },
});

export const arrowFill = style({
  fill: sys.color.surface.base,
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: sys.color.container.high,
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: sys.color.container.top,
    },
  },
});

export const navigationMenuRecipe = recipe({
  base: root,
});
