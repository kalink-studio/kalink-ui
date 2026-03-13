import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';
import { organisms } from '../../styles/layers.css';
import {
  createDialogActionsStyles,
  createDialogBackdropStyles,
  createDialogButtonStyles,
  createDialogDescriptionStyles,
  createDialogPopupStyles,
  createDialogTitleStyles,
} from '../_foundation';

export const alertDialogVars = createThemeContract({
  color: {
    backdrop: null,
    description: null,
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
  },
  layout: {
    backdropMinBlockSize: null,
    popupInlineSize: null,
    popupMaxInlineSize: null,
  },
  shape: {
    popupCorner: null,
  },
  spacing: {
    actionsGap: null,
    descriptionMarginBlock: null,
    descriptionMarginInline: null,
    popupMarginBlockStart: null,
    popupPaddingBlock: null,
    popupPaddingInline: null,
    titleMarginBlockEnd: null,
    titleMarginBlockStart: null,
  },
});

const alertDialogDefaults = assignVars(alertDialogVars, {
  color: {
    backdrop: sys.color.content.base,
    description: stateColor.mutedContent,
    popupBackground: sys.color.container.base,
    popupForeground: sys.color.content.base,
    popupOutline: sys.color.border.low,
  },
  layout: {
    backdropMinBlockSize: '100dvh',
    popupInlineSize: '24rem',
    popupMaxInlineSize: `calc(100vw - ${sys.spacing[15]})`,
  },
  shape: {
    popupCorner: sys.shape.corner.medium,
  },
  spacing: {
    actionsGap: sys.spacing[8],
    descriptionMarginBlock: `0 ${sys.spacing[10]}`,
    descriptionMarginInline: '0',
    popupMarginBlockStart: `calc(-1 * ${sys.spacing[12]})`,
    popupPaddingBlock: sys.spacing[6],
    popupPaddingInline: sys.spacing[6],
    titleMarginBlockEnd: sys.spacing[2],
    titleMarginBlockStart: sys.spacing[2],
  },
});

export const button = style({
  '@layer': {
    [organisms]: createDialogButtonStyles({
      vars: alertDialogDefaults,
    }),
  },
});

export const backdrop = style({
  '@layer': {
    [organisms]: createDialogBackdropStyles({
      vars: alertDialogDefaults,

      minBlockSize: alertDialogVars.layout.backdropMinBlockSize,

      backdropColor: alertDialogVars.color.backdrop,

      transition: transition('opacity', {
        duration: 'short.4',
        easing: 'decelerate.emphasized',
      }),
    }),
  },
});

export const popup = style({
  '@layer': {
    [organisms]: createDialogPopupStyles({
      vars: alertDialogDefaults,

      inlineSize: alertDialogVars.layout.popupInlineSize,
      maxInlineSize: alertDialogVars.layout.popupMaxInlineSize,
      marginBlockStart: alertDialogVars.spacing.popupMarginBlockStart,
      paddingBlock: alertDialogVars.spacing.popupPaddingBlock,
      paddingInline: alertDialogVars.spacing.popupPaddingInline,

      popupForeground: alertDialogVars.color.popupForeground,
      popupBackground: alertDialogVars.color.popupBackground,
      popupCorner: alertDialogVars.shape.popupCorner,
      outline: alertDialogVars.color.popupOutline,

      transition: transition(['opacity', 'transform'], {
        duration: 'short.4',
        easing: 'standard',
      }),
    }),
  },
});

export const title = style({
  '@layer': {
    [organisms]: createDialogTitleStyles({
      marginBlockStart: alertDialogVars.spacing.titleMarginBlockStart,
      marginBlockEnd: alertDialogVars.spacing.titleMarginBlockEnd,
    }),
  },
});

export const description = style({
  '@layer': {
    [organisms]: createDialogDescriptionStyles({
      marginBlock: alertDialogVars.spacing.descriptionMarginBlock,
      marginInline: alertDialogVars.spacing.descriptionMarginInline,

      descriptionColor: alertDialogVars.color.description,
    }),
  },
});

export const actions = style({
  '@layer': {
    [organisms]: createDialogActionsStyles({
      gap: alertDialogVars.spacing.actionsGap,
    }),
  },
});
