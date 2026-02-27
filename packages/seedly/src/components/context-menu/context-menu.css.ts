import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFloatingItemStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
} from '../_foundation';
import {
  buttonBaseClass,
  buttonStyledVariantClass,
  buttonVars,
} from '../button';

export const contextMenuVars = createThemeContract({
  layout: {
    triggerBlockSize: null,
  },
  size: {
    separatorBlockSize: null,
  },
});

const contextMenuLayoutDefaults = assignVars(contextMenuVars.layout, {
  triggerBlockSize: '12rem',
});

const contextMenuSizeDefaults = assignVars(contextMenuVars.size, {
  separatorBlockSize: '1px',
});

const contextMenuItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
  }).selectors ?? {};

const contextMenuTriggerButtonVars = {
  ...assignVars(buttonVars.color, {
    rootActiveBackground: sys.color.container.low,
    rootActiveBorder: sys.color.border.base,
    rootActiveForeground: sys.color.content.base,
    rootBackground: 'transparent',
    rootBorder: sys.color.border.base,
    rootDisabledBackground: 'transparent',
    rootDisabledBorder: sys.color.border.base,
    rootDisabledForeground: stateColor.disabledContent,
    rootFocusRing: sys.color.tone.primary,
    rootForeground: sys.color.content.base,
    rootHoverBackground: sys.color.container.low,
    rootHoverBorder: sys.color.border.base,
    rootHoverForeground: sys.color.content.base,
    rootLoadingBackground: sys.color.container.low,
    rootLoadingBorder: sys.color.border.base,
    rootLoadingForeground: sys.color.content.base,
  }),
  ...assignVars(buttonVars.spacing, {
    rootGap: '0',
    rootPaddingBlock: '0',
    rootPaddingInline: '0',
  }),
  ...assignVars(buttonVars.shape, {
    rootCorner: sys.shape.corner.medium,
  }),
};

export const trigger = style([
  typography.label.large,
  buttonBaseClass,
  buttonStyledVariantClass,
  {
    inlineSize: '100%',
    blockSize: contextMenuVars.layout.triggerBlockSize,
    WebkitUserSelect: 'none',
    userSelect: 'none',
    vars: {
      ...contextMenuTriggerButtonVars,
      ...contextMenuLayoutDefaults,
      ...contextMenuSizeDefaults,
    },
  },
]);

export const positioner = style({
  ...createFloatingPositionerStyles(),
});

export const popup = style({
  ...createFloatingSurfaceStyles({
    paddingBlock: sys.spacing[2],
    motion: {
      preset: 'fadeOut',
    },
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
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  blockSize: contextMenuVars.size.separatorBlockSize,
  backgroundColor: sys.color.border.high,
});
