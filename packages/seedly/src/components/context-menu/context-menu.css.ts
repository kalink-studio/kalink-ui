import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createFloatingItemStyles,
  createFloatingPositionerStyles,
  createFloatingSurfaceStyles,
  createInsetHighlightStyles,
} from '../_foundation';

export const contextMenuVars = createThemeContract({
  color: {
    itemHighlightedBackground: null,
    itemHighlightedForeground: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    popupShadow: null,
    separator: null,
  },

  shape: {
    itemHighlightCorner: null,
    popupCorner: null,
  },

  size: {
    separatorBlockSize: null,
  },

  spacing: {
    itemHighlightInsetInline: null,
    popupPaddingBlock: null,
    separatorMarginBlock: null,
    separatorMarginInline: null,
  },
});

const contextMenuDefaults = assignVars(contextMenuVars, {
  color: {
    itemHighlightedBackground: sys.color.content.base,
    itemHighlightedForeground: sys.color.container.base,
    popupBackground: sys.color.surface.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
    popupShadow: sys.elevation.moderate,
    separator: sys.color.border.high,
  },

  shape: {
    itemHighlightCorner: sys.shape.corner.small,
    popupCorner: sys.shape.corner.medium,
  },

  size: {
    separatorBlockSize: '1px',
  },

  spacing: {
    itemHighlightInsetInline: sys.spacing[4],
    popupPaddingBlock: sys.spacing[2],
    separatorMarginBlock: sys.spacing[3],
    separatorMarginInline: sys.spacing[8],
  },
});

const contextMenuItemHighlightSelectors =
  createInsetHighlightStyles({
    backgroundColor: contextMenuVars.color.itemHighlightedBackground,
    borderRadius: contextMenuVars.shape.itemHighlightCorner,
    insetInline: contextMenuVars.spacing.itemHighlightInsetInline,
    textColor: contextMenuVars.color.itemHighlightedForeground,
  }).selectors ?? {};

export const positioner = style({
  ...createFloatingPositionerStyles({
    vars: {
      ...contextMenuDefaults,
    },
  }),
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    background: contextMenuVars.color.popupBackground,
    borderRadius: contextMenuVars.shape.popupCorner,
    foreground: contextMenuVars.color.popupForeground,
    motion: {
      preset: 'fadeOut',
    },
    outline: contextMenuVars.color.popupOutline,
    paddingBlock: contextMenuVars.spacing.popupPaddingBlock,
    shadow: contextMenuVars.color.popupShadow,
  }),
});

export const item = style([
  typography.label.medium,
  createFloatingItemStyles({
    preset: 'menu',
    selectors: {
      ...contextMenuItemHighlightSelectors,
    },
  }),
]);

export const separator = style({
  blockSize: contextMenuVars.size.separatorBlockSize,
  marginBlock: contextMenuVars.spacing.separatorMarginBlock,
  marginInline: contextMenuVars.spacing.separatorMarginInline,

  backgroundColor: contextMenuVars.color.separator,
});
