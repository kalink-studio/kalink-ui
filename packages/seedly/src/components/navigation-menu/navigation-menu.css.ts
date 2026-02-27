import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { stateColor, sys, transition } from '../../styles';
import {
  createArrowFillStyles,
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFloatingArrowPlacementStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const navigationMenuVars = createThemeContract({
  layout: {
    contentMinInlineSizeDesktop: null,
    gridLinkColumnInlineSize: null,
    flexLinkListMaxInlineSize: null,
  },
});

const navigationMenuLayoutDefaults = assignVars(navigationMenuVars.layout, {
  contentMinInlineSizeDesktop: '400px',
  gridLinkColumnInlineSize: '12rem',
  flexLinkListMaxInlineSize: '400px',
});

export const root = style({
  minInlineSize: 'max-content',
  vars: {
    ...navigationMenuLayoutDefaults,
  },
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
  transition: transition('transform', {
    duration: 'medium.3',
    easing: 'standard',
  }),

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
  transition: transition(['top', 'left', 'right', 'bottom'], {
    duration: 'var(--duration)',
    easing: 'var(--easing)',
  }),
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
  ...createFloatingSurfaceStyles({
    borderRadius: sys.shape.corner.rounded,
    inlineSize: 'var(--popup-width)',
    blockSize: 'var(--popup-height)',
    motion: {
      transition: transition(
        ['opacity', 'transform', 'inline-size', 'block-size'],
        {
          duration: 'var(--duration)',
          easing: 'var(--easing)',
        },
      ),
      endingStyle: {
        opacity: '0',
        transform: 'scale(0.9)',
        transition: transition(['opacity', 'transform'], {
          duration: 'short.4',
          easing: 'standard',
        }),
      },
    },
  }),
  position: 'relative',
});

export const content = style({
  inlineSize: calc.subtract('100vw', sys.spacing[14]),
  blockSize: '100%',
  paddingBlock: sys.spacing[10],
  paddingInline: sys.spacing[10],
  transition: `${transition('opacity', {
    duration: 'long.3',
    easing: 'standard',
  })}, ${transition('transform', {
    duration: 'medium.3',
    easing: 'decelerate.emphasized',
  })}`,
  '@media': {
    '(min-width: 500px)': {
      inlineSize: 'max-content',
      minInlineSize: navigationMenuVars.layout.contentMinInlineSizeDesktop,
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
  gridTemplateColumns: `${navigationMenuVars.layout.gridLinkColumnInlineSize} ${navigationMenuVars.layout.gridLinkColumnInlineSize}`,
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
  maxInlineSize: navigationMenuVars.layout.flexLinkListMaxInlineSize,
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
  transition: transition('left', {
    duration: 'calc(var(--duration))',
    easing: 'var(--easing)',
  }),
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
