import { style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createFloatingPopupStyles,
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
    insetInline: sys.spacing[2],
    borderRadius: '0.25rem',
  }).selectors ?? {};

const menubarHighlightedItemSelectors =
  createInsetHighlightStyles({
    textColor: sys.color.container.base,
    backgroundColor: sys.color.content.base,
    insetInline: sys.spacing[2],
    borderRadius: '0.25rem',
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
    borderRadius: '0.25rem',

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
  ...createFloatingPositionerStyles({
    outline: '0',
  }),
});

export const menuPopup = style({
  ...createFloatingPopupStyles({
    paddingBlock: sys.spacing[2],
    borderRadius: '0.375rem',
    backgroundColor: sys.color.surface.base,
    color: sys.color.content.base,
    lightOutline: sys.color.border.low,
    darkOutline: sys.color.border.low,
    darkOutlineOffset: '-1px',
    shadow: sys.elevation.moderate,
    transition: null,
    includeStartingStyle: false,
    endingStyle: {
      opacity: '0',
      transition: 'opacity 150ms',
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
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sys.spacing[8],
    paddingBlock: sys.spacing[4],
    paddingInline: sys.spacing[8],
    outline: '0',
    cursor: 'default',
    userSelect: 'none',

    selectors: {
      ...menubarPopupOpenItemSelectors,
      ...menubarHighlightedItemSelectors,
    },
  },
]);

export const menuSeparator = style({
  blockSize: '1px',
  marginBlock: sys.spacing[3],
  marginInline: sys.spacing[8],
  backgroundColor: sys.color.border.high,
});
