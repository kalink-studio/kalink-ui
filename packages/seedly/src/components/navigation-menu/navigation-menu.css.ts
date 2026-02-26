import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { stateColor, sys, typography } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingPopupStyles,
  createFloatingPositionerStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const root = style({
  minInlineSize: 'max-content',
});

export const list = style({
  display: 'flex',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  position: 'relative',
  listStyle: 'none',
});

export const trigger = style([
  typography.label.large,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sys.spacing[3],
    blockSize: sys.spacing[14],
    paddingInline: sys.spacing[7],
    marginBlock: '0',
    marginInline: '0',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    backgroundColor: sys.color.container.base,
    borderRadius: sys.shape.corner.medium,
    outline: '0',
    userSelect: 'none',
    '@media': {
      '(max-width: 500px)': {
        fontSize: sys.typography.label.medium.size,
        lineHeight: sys.typography.label.medium.lineHeight,
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
  },
]);

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `transform ${sys.motion.duration.medium[1]} ${sys.motion.easing.standard}`,

  selectors: {
    [`&[data-popup-open]`]: {
      transform: 'rotate(180deg)',
    },
  },
});

export const positioner = style({
  ...createFloatingPositionerStyles(),
  inlineSize: 'var(--positioner-width)',
  blockSize: 'var(--positioner-height)',
  maxInlineSize: 'var(--available-width)',
  transitionProperty: 'top, left, right, bottom',
  transitionDuration: 'var(--duration)',
  transitionTimingFunction: 'var(--easing)',
  vars: {
    '--easing': sys.motion.easing.decelerate.emphasized,
    '--duration': sys.motion.duration.medium[4],
  },

  selectors: {
    [`&::before`]: {
      position: 'absolute',
      content: "''",
    },
    [`&[data-side='top']::before`]: {
      blockSize: sys.spacing[5],
      left: '0',
      right: '0',
      bottom: calc.negate(sys.spacing[5]),
    },
    [`&[data-side='bottom']::before`]: {
      blockSize: sys.spacing[5],
      left: '0',
      right: '0',
      top: calc.negate(sys.spacing[5]),
    },
    [`&[data-side='left']::before`]: {
      inlineSize: sys.spacing[5],
      top: '0',
      bottom: '0',
      right: calc.negate(sys.spacing[5]),
    },
    [`&[data-side='right']::before`]: {
      inlineSize: sys.spacing[5],
      top: '0',
      bottom: '0',
      left: calc.negate(sys.spacing[5]),
    },
    [`&[data-instant]`]: {
      transition: 'none',
    },
  },
});

export const popup = style({
  ...createFloatingPopupStyles({
    borderRadius: sys.shape.corner.rounded,
    inlineSize: 'var(--popup-width)',
    blockSize: 'var(--popup-height)',
    transition:
      'opacity var(--duration),\n    transform var(--duration),\n    inline-size var(--duration),\n    block-size var(--duration)',
    endingStyle: {
      opacity: '0',
      transform: 'scale(0.9)',
      transitionTimingFunction: sys.motion.easing.standard,
      transitionDuration: sys.motion.duration.short[4],
    },
  }),
  position: 'relative',
});

export const content = style({
  inlineSize: calc.subtract('100vw', sys.spacing[14]),
  blockSize: '100%',
  paddingBlock: sys.spacing[10],
  paddingInline: sys.spacing[10],
  transition:
    'opacity calc(var(--duration) * 0.5) ease,\n    transform var(--duration) var(--easing)',
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
  inlineSize: '100%',
  blockSize: '100%',
  overflow: 'hidden',
  position: 'relative',
});

export const gridLinkList = style({
  display: 'grid',
  gridTemplateColumns: '12rem 12rem',
  paddingBlock: '0',
  paddingInline: '0',
  marginBlock: '0',
  marginInline: '0',
  listStyle: 'none',
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
  display: 'block',
  paddingBlock: sys.spacing[4],
  paddingInline: sys.spacing[4],
  textDecoration: 'none',
  color: 'inherit',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: sys.shape.corner.medium,
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
  fontSize: sys.typography.body.medium.size,
  lineHeight: '1.25rem',
  whiteSpace: 'normal',
  overflowWrap: 'anywhere',
  color: stateColor.disabledContent,
});

export const arrow = style({
  ...createFloatingArrowPlacementStyles(),
  transition: 'left calc(var(--duration)) var(--easing)',
});

export const arrowFill = style({
  ...createArrowFillStyles(sys.color.surface.base),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(sys.color.border.low),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(floatingSurfaceDarkOutlineColor),
});
