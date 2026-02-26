import { style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createFloatingItemStyles,
  createFloatingSurfaceStyles,
  createFloatingPositionerStyles,
  createInsetHighlightStyles,
  createInteractiveStateStyles,
} from '../_foundation';

const menubarTriggerStateSelectors =
  createInteractiveStateStyles({
    pressed: {
      styles: {
        backgroundColor: sys.color.container.low,
        outline: 'none',
      },
    },
    disabled: {
      styles: {
        opacity: '0.5',
      },
    },
  }).selectors ?? {};

const menubarPopupOpenItemSelectors =
  createInsetHighlightStyles({
    selector: '&[data-popup-open]',
    backgroundColor: sys.color.container.low,
  }).selectors ?? {};

const menubarHighlightedItemSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
  }).selectors ?? {};

export const menubar = style({
  display: 'flex',
});

export const menuTrigger = style([
  typography.label.medium,
  {
    blockSize: sys.spacing[12],
    paddingBlock: '0',
    paddingInline: sys.spacing[6],
    borderRadius: sys.shape.corner.small,

    selectors: {
      ...menubarTriggerStateSelectors,
      [`&:focus-visible`]: {
        backgroundColor: sys.color.container.low,
        outline: 'none',
      },
    },
  },
]);

export const menuPositioner = style({
  ...createFloatingPositionerStyles(),
});

export const menuPopup = style({
  ...createFloatingSurfaceStyles({
    paddingBlock: sys.spacing[2],
    motion: {
      preset: 'fadeOut',
      transition: null,
      endingStyle: {
        opacity: '0',
        transition: `opacity ${sys.motion.duration.short[4]} ${sys.motion.easing.standard}`,
      },
    },
    selectors: {
      [`&[data-instant]`]: {
        transition: 'none',
      },
    },
  }),
});

export const menuItem = style([
  typography.label.medium,
  createFloatingItemStyles({
    preset: 'menuRow',
    selectors: {
      ...menubarPopupOpenItemSelectors,
      ...menubarHighlightedItemSelectors,
    },
  }),
]);

export const menuSeparator = style({
  blockSize: '1px',
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  backgroundColor: sys.color.border.high,
});
