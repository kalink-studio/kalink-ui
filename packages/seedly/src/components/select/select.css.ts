import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createArrowInnerStrokeStyles,
  createArrowOuterStrokeStyles,
  createFieldTextInputTriggerStyles,
  createFloatingHighlightedItemStyles,
  createFloatingListStyles,
  createFloatingAnchoredSurfaceStyles,
  createFloatingPositionerStyles,
  createInteractiveStateStyles,
  floatingPanelMaxBlockSize,
  floatingSurfaceDarkOutlineColor,
} from '../_foundation';

export const selectVars = createThemeContract({
  color: {
    arrowInnerStroke: null,
    arrowOuterStroke: null,
    itemHighlightBackground: null,
    itemHighlightForeground: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupOutlineInverse: null,
    popupShadow: null,
    scrollArrowBackground: null,
    triggerBackground: null,
    triggerBorder: null,
    triggerFocusRing: null,
    triggerForeground: null,
    triggerHoverBackground: null,
    triggerOpenBackground: null,
  },
  layout: {
    triggerFocusRingOffset: null,
    triggerInlineSize: null,
  },
  shape: {
    itemHighlightCorner: null,
    popupCorner: null,
    scrollArrowCorner: null,
    triggerCorner: null,
  },
  size: {
    listMaxBlockSize: null,
    triggerBlockSize: null,
  },
  spacing: {
    itemHighlightInsetInline: null,
    itemPaddingBlock: null,
    itemPaddingBlockCoarse: null,
    itemPaddingInlineEnd: null,
    itemPaddingInlineEndWithoutSide: null,
    itemPaddingInlineStart: null,
    listPaddingBlock: null,
    listScrollPaddingBlock: null,
    popupMinInlineOffset: null,
    scrollArrowBlockSize: null,
    triggerGap: null,
    triggerPaddingInlineEnd: null,
    triggerPaddingInlineStart: null,
  },
});

const selectDefaults = assignVars(selectVars, {
  color: {
    arrowInnerStroke: floatingSurfaceDarkOutlineColor,
    arrowOuterStroke: sys.color.border.low,
    itemHighlightBackground: sys.color.content.base,
    itemHighlightForeground: sys.color.container.base,
    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupOutlineInverse: 'transparent',
    popupShadow: sys.elevation.moderate,
    scrollArrowBackground: sys.color.surface.base,
    triggerBackground: sys.color.surface.base,
    triggerBorder: sys.color.border.base,
    triggerFocusRing: sys.color.tone.primary,
    triggerForeground: sys.color.content.base,
    triggerHoverBackground: sys.color.container.low,
    triggerOpenBackground: sys.color.container.low,
  },
  layout: {
    triggerFocusRingOffset: '-1px',
    triggerInlineSize: '100%',
  },
  shape: {
    itemHighlightCorner: sys.shape.corner.small,
    popupCorner: sys.shape.corner.medium,
    scrollArrowCorner: sys.shape.corner.medium,
    triggerCorner: sys.shape.corner.medium,
  },
  size: {
    listMaxBlockSize: floatingPanelMaxBlockSize,
    triggerBlockSize: sys.spacing[14],
  },
  spacing: {
    itemHighlightInsetInline: sys.spacing[4],
    itemPaddingBlock: sys.spacing[2],
    itemPaddingBlockCoarse: sys.spacing[5],
    itemPaddingInlineEnd: sys.spacing[8],
    itemPaddingInlineEndWithoutSide: sys.spacing[15],
    itemPaddingInlineStart: sys.spacing[8],
    listPaddingBlock: sys.spacing[2],
    listScrollPaddingBlock: sys.spacing[2],
    popupMinInlineOffset: sys.spacing[0],
    scrollArrowBlockSize: sys.spacing[8],
    triggerGap: sys.spacing[6],
    triggerPaddingInlineEnd: sys.spacing[6],
    triggerPaddingInlineStart: sys.spacing[4],
  },
});

export const select = style([
  typography.label.large,
  {
    '@layer': {
      [components]: {
        vars: {
          ...selectDefaults,
        },
        ...createFieldTextInputTriggerStyles({
          foreground: selectVars.color.triggerForeground,
          borderColor: selectVars.color.triggerBorder,
          backgroundColor: selectVars.color.triggerBackground,
          borderRadius: selectVars.shape.triggerCorner,
          focusRingColor: selectVars.color.triggerFocusRing,
          focusRingOffset: selectVars.layout.triggerFocusRingOffset,
          gap: selectVars.spacing.triggerGap,
          paddingInlineStart: selectVars.spacing.triggerPaddingInlineStart,
          paddingInlineEnd: selectVars.spacing.triggerPaddingInlineEnd,
          inlineSize: selectVars.layout.triggerInlineSize,
          blockSize: selectVars.size.triggerBlockSize,
        }),
        ...createInteractiveStateStyles({
          hover: {
            backgroundColor: selectVars.color.triggerHoverBackground,
          },
          popupOpen: {
            styles: {
              backgroundColor: selectVars.color.triggerOpenBackground,
              borderColor: selectVars.color.triggerBorder,
            },
          },
        }),
      },
    },
  },
]);

export const selectIcon = style({
  '@layer': {
    [components]: {
      display: 'flex',
    },
  },
});

export const value = style({
  '@layer': {
    [components]: {
      selectors: {
        [`&[data-placeholder]`]: {
          opacity: sys.state.muted.text,
        },
      },
    },
  },
});

export const positioner = style({
  '@layer': {
    [components]: {
      ...createFloatingPositionerStyles({
        zIndex: '1',
        webkitUserSelect: 'none',
        userSelect: 'none',
      }),
      vars: {
        ...selectDefaults,
      },
    },
  },
});

export const popup = style({
  '@layer': {
    [components]: {
      ...createFloatingAnchoredSurfaceStyles({
        anchorWidth: 'min-inline',
        borderRadius: selectVars.shape.popupCorner,
        background: selectVars.color.popupBackground,
        foreground: selectVars.color.popupForeground,
        backgroundClip: 'padding-box',
        outline: selectVars.color.popupOutline,
        outlineInverse: selectVars.color.popupOutlineInverse,
        shadow: selectVars.color.popupShadow,
        motion: {
          preset: 'scaleSoft',
        },
        selectors: {
          [`&[data-side='none']`]: {
            minInlineSize: 'var(--anchor-width)',
          },
        },
      }),
    },
  },
});

export const list = style({
  '@layer': {
    [components]: {
      ...createFloatingListStyles({
        preset: 'listboxCompact',
        maxBlockSize: selectVars.size.listMaxBlockSize,
        paddingBlock: selectVars.spacing.listPaddingBlock,
        scrollPaddingBlock: selectVars.spacing.listScrollPaddingBlock,
      }),
    },
  },
});

export const arrowOuterStroke = style({
  '@layer': {
    [components]: {
      ...createArrowOuterStrokeStyles(selectVars.color.arrowOuterStroke),
    },
  },
});

export const arrowInnerStroke = style({
  '@layer': {
    [components]: {
      ...createArrowInnerStrokeStyles(selectVars.color.arrowInnerStroke),
    },
  },
});

export const item = style([
  typography.body.large,
  {
    '@layer': {
      [components]: createFloatingHighlightedItemStyles({
        preset: 'listboxWithIndicator',
        paddingBlock: selectVars.spacing.itemPaddingBlock,
        highlight: {
          backgroundColor: selectVars.color.itemHighlightBackground,
          borderRadius: selectVars.shape.itemHighlightCorner,
          insetInline: selectVars.spacing.itemHighlightInsetInline,
          textColor: selectVars.color.itemHighlightForeground,
        },
        paddingInlineStart: selectVars.spacing.itemPaddingInlineStart,
        paddingInlineEnd: selectVars.spacing.itemPaddingInlineEnd,
        webkitUserSelect: 'none',
        media: {
          '(pointer: coarse)': {
            paddingBlock: selectVars.spacing.itemPaddingBlockCoarse,
            fontSize: sys.typography.label.large.size,
            lineHeight: sys.typography.label.large.lineHeight,
          },
        },
        selectors: {
          [`[data-side='none'] &`]: {
            fontSize: sys.typography.label.large.size,
            lineHeight: sys.typography.label.large.lineHeight,
            paddingInlineEnd:
              selectVars.spacing.itemPaddingInlineEndWithoutSide,
          },
        },
      }),
    },
  },
]);

export const itemIndicator = style({
  '@layer': {
    [components]: {
      gridColumnStart: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});
export const itemText = style({
  '@layer': {
    [components]: {
      gridColumnStart: '2',
    },
  },
});

export const scrollArrow = style([
  typography.label.small,
  {
    '@layer': {
      [components]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inlineSize: '100%',
        blockSize: selectVars.spacing.scrollArrowBlockSize,
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
    },
  },
]);
