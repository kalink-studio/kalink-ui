import { assignVars, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFloatingItemStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
} from '../_foundation';
import {
  buttonBaseClass,
  buttonStateVars,
  buttonStyledVariantClass,
  buttonVars,
} from '../button';

const contextMenuItemHighlightSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
  }).selectors ?? {};

const contextMenuTriggerButtonVars = {
  ...assignVars(buttonVars.color, {
    foreground: sys.color.content.base,
    background: 'transparent',
    border: sys.color.border.base,
    focusRing: sys.color.tone.primary,
  }),
  ...assignVars(buttonStateVars.color, {
    hoverForeground: sys.color.content.base,
    hoverBackground: sys.color.container.low,
    hoverBorder: sys.color.border.base,
    activeForeground: sys.color.content.base,
    activeBackground: sys.color.container.low,
    activeBorder: sys.color.border.base,
    disabledForeground: stateColor.disabledContent,
    disabledBackground: 'transparent',
    disabledBorder: sys.color.border.base,
    loadingForeground: sys.color.content.base,
    loadingBackground: sys.color.container.low,
    loadingBorder: sys.color.border.base,
  }),
  ...assignVars(buttonVars.spacing, {
    block: '0',
    inline: '0',
    gap: '0',
  }),
  ...assignVars(buttonVars.shape, {
    corner: sys.shape.corner.medium,
  }),
};

export const trigger = style([
  typography.label.large,
  buttonBaseClass,
  buttonStyledVariantClass,
  {
    inlineSize: '100%',
    blockSize: '12rem',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    vars: contextMenuTriggerButtonVars,
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
  blockSize: '1px',
  backgroundColor: sys.color.border.high,
});
