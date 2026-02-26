import { assignVars, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import {
  createFloatingPopupStyles,
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
    backgroundColor: sys.color.content.base,
    insetInline: sys.spacing[2],
    borderRadius: '0.25rem',
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
    corner: '0.375rem',
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
  ...createFloatingPositionerStyles({
    outline: '0',
  }),
});

export const popup = style({
  ...createFloatingPopupStyles({
    paddingBlock: sys.spacing[2],
    borderRadius: '0.375rem',
    backgroundColor: sys.color.surface.base,
    color: sys.color.content.base,
    lightOutline: sys.color.border.low,
    darkOutline: sys.color.border.low,
    darkOutlineOffset: '-1px',
    shadow: sys.elevation.moderate,
    includeStartingStyle: false,
    endingStyle: {
      opacity: '0',
    },
  }),
});

export const item = style([
  typography.label.medium,
  {
    outline: '0',
    cursor: 'default',
    userSelect: 'none',
    paddingBlock: sys.spacing[4],
    paddingInlineStart: sys.spacing[8],
    paddingInlineEnd: sys.spacing[12],
    display: 'flex',

    selectors: {
      ...contextMenuItemHighlightSelectors,
    },
  },
]);

export const separator = style({
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  blockSize: '1px',
  backgroundColor: sys.color.border.high,
});
