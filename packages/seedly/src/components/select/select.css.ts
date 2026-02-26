import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { sys, typography } from '../../styles';
import {
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFieldTextInputTriggerStyles,
  createFloatingItemStyles,
  createFloatingListStyles,
  createFloatingAnchoredSurfaceStyles,
  createFloatingPositionerStyles,
  createInteractiveStateStyles,
  createInsetHighlightStyles,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const selectVars = createThemeContract({
  color: {
    foreground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerHoverBackground: null,
    focusRing: null,
    popupBackground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
    popupShadow: null,
    itemHighlightedForeground: null,
    itemHighlightedBackground: null,
    arrowOuterStroke: null,
    arrowInnerStroke: null,
    scrollArrowBackground: null,
  },
  shape: {
    triggerCorner: null,
    popupCorner: null,
    itemCorner: null,
    scrollArrowCorner: null,
  },
});

const selectColorDefaults = assignVars(selectVars.color, {
  foreground: sys.color.content.base,
  triggerBackground: sys.color.surface.base,
  triggerBorder: sys.color.border.base,
  triggerHoverBackground: sys.color.container.low,
  focusRing: sys.color.tone.primary,
  popupBackground: sys.color.surface.base,
  popupOutlineLight: sys.color.border.low,
  popupOutlineDark: sys.color.border.low,
  popupShadow: sys.elevation.moderate,
  itemHighlightedForeground: sys.color.container.base,
  itemHighlightedBackground: sys.color.content.base,
  arrowOuterStroke: sys.color.border.low,
  arrowInnerStroke: floatingSurfaceDarkOutlineColor,
  scrollArrowBackground: sys.color.surface.base,
});

const selectShapeDefaults = assignVars(selectVars.shape, {
  triggerCorner: sys.shape.corner.medium,
  popupCorner: sys.shape.corner.medium,
  itemCorner: sys.shape.corner.small,
  scrollArrowCorner: sys.shape.corner.medium,
});

const selectItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: selectVars.color.itemHighlightedForeground,
    backgroundColor: selectVars.color.itemHighlightedBackground,
    borderRadius: selectVars.shape.itemCorner,
  }).selectors ?? {};

export const select = style([
  typography.label.large,
  {
    vars: {
      ...selectColorDefaults,
      ...selectShapeDefaults,
    },
    ...createFieldTextInputTriggerStyles({
      foreground: selectVars.color.foreground,
      borderColor: selectVars.color.triggerBorder,
      backgroundColor: selectVars.color.triggerBackground,
      borderRadius: selectVars.shape.triggerCorner,
      focusRingColor: selectVars.color.focusRing,
      gap: sys.spacing[6],
      paddingInlineEnd: sys.spacing[6],
    }),
    ...createInteractiveStateStyles({
      hover: {
        backgroundColor: selectVars.color.triggerHoverBackground,
      },
      popupOpen: {
        styles: {
          backgroundColor: selectVars.color.triggerHoverBackground,
          borderColor: selectVars.color.triggerBorder,
        },
      },
    }),
  },
]);

export const selectIcon = style({
  display: 'flex',
});

export const value = style({
  selectors: {
    [`&[data-placeholder]`]: {
      opacity: '0.6',
    },
  },
});

export const positioner = style({
  ...createFloatingPositionerStyles({
    zIndex: '1',
    webkitUserSelect: 'none',
    userSelect: 'none',
  }),
  vars: {
    ...selectColorDefaults,
    ...selectShapeDefaults,
  },
});

export const popup = style({
  ...createFloatingAnchoredSurfaceStyles({
    anchorWidth: 'min-inline',
    borderRadius: selectVars.shape.popupCorner,
    background: selectVars.color.popupBackground,
    foreground: selectVars.color.foreground,
    backgroundClip: 'padding-box',
    outlineLight: selectVars.color.popupOutlineLight,
    outlineDark: selectVars.color.popupOutlineDark,
    shadow: selectVars.color.popupShadow,
    selectors: {
      [`&[data-side='none']`]: {
        transition: 'none',
        transform: 'none',
        opacity: '1',
        minInlineSize: calc.add('var(--anchor-width)', sys.spacing[8]),
      },
    },
  }),
});

export const list = style({
  ...createFloatingListStyles({
    preset: 'listboxCompact',
  }),
});

export const arrowOuterStroke = style({
  ...createArrowOuterStrokeStyles(selectVars.color.arrowOuterStroke),
});

export const arrowInnerStroke = style({
  ...createArrowInnerStrokeStyles(selectVars.color.arrowInnerStroke),
});

export const item = style([
  typography.label.medium,
  createFloatingItemStyles({
    preset: 'listboxWithIndicator',
    paddingInlineStart: sys.spacing[5],
    paddingInlineEnd: sys.spacing[8],
    webkitUserSelect: 'none',
    media: {
      '(pointer: coarse)': {
        paddingBlock: sys.spacing[5],
        fontSize: sys.typography.label.large.size,
        lineHeight: sys.typography.label.large.lineHeight,
      },
    },
    selectors: {
      [`[data-side='none'] &`]: {
        fontSize: sys.typography.label.large.size,
        lineHeight: sys.typography.label.large.lineHeight,
        paddingInlineEnd: sys.spacing[15],
      },
      ...selectItemHighlightSelectors,
    },
  }),
]);

export const itemIndicator = style({
  gridColumnStart: '1',
});
export const itemText = style({
  gridColumnStart: '2',
});

export const scrollArrow = style([
  typography.label.small,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: '100%',
    blockSize: sys.spacing[8],
    zIndex: '1',
    textAlign: 'center',
    background: selectVars.color.scrollArrowBackground,
    borderRadius: selectVars.shape.scrollArrowCorner,
    cursor: 'default',

    selectors: {
      [`&::before`]: {
        content: "''",
        position: 'absolute',
        inlineSize: '100%',
        blockSize: '100%',
        insetInlineStart: '0',
      },
      [`&[data-direction='up'][data-side='none']::before`]: {
        insetBlockStart: '-100%',
      },
      [`&[data-direction='down']`]: {
        insetBlockEnd: '0',
      },
      [`&[data-direction='down'][data-side='none']::before`]: {
        insetBlockEnd: '-100%',
      },
    },
  },
]);
