import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition, typography } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createDialogActionsStyles,
  createDialogBackdropStyles,
  createDialogButtonStyles,
  createDialogDescriptionStyles,
  createDialogPopupStyles,
  createDialogTitleStyles,
} from '../_foundation';

export const dialogVars = createThemeContract({
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

const dialogDefaults = assignVars(dialogVars, {
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
    [components]: createDialogButtonStyles({
      vars: dialogDefaults,
    }),
  },
});

export const backdrop = style({
  '@layer': {
    [components]: createDialogBackdropStyles({
      vars: dialogDefaults,

      minBlockSize: dialogVars.layout.backdropMinBlockSize,

      backdropColor: dialogVars.color.backdrop,

      transition: transition('opacity', {
        duration: 'short.4',
        easing: 'decelerate.emphasized',
      }),
    }),
  },
});

export const popup = style({
  '@layer': {
    [components]: createDialogPopupStyles({
      vars: dialogDefaults,

      inlineSize: dialogVars.layout.popupInlineSize,
      maxInlineSize: dialogVars.layout.popupMaxInlineSize,
      marginBlockStart: dialogVars.spacing.popupMarginBlockStart,
      paddingBlock: dialogVars.spacing.popupPaddingBlock,
      paddingInline: dialogVars.spacing.popupPaddingInline,

      popupForeground: dialogVars.color.popupForeground,
      popupBackground: dialogVars.color.popupBackground,
      popupCorner: dialogVars.shape.popupCorner,
      outline: dialogVars.color.popupOutline,

      transition: transition(['opacity', 'transform'], {
        duration: 'short.4',
        easing: 'decelerate.emphasized',
      }),
    }),
  },
});

export const title = style([
  typography.title.large,
  {
    '@layer': {
      [components]: createDialogTitleStyles({
        marginBlockStart: dialogVars.spacing.titleMarginBlockStart,
        marginBlockEnd: dialogVars.spacing.titleMarginBlockEnd,
      }),
    },
  },
]);

export const description = style([
  typography.body.large,
  {
    '@layer': {
      [components]: createDialogDescriptionStyles({
        descriptionColor: dialogVars.color.description,
        marginBlock: dialogVars.spacing.descriptionMarginBlock,
        marginInline: dialogVars.spacing.descriptionMarginInline,
      }),
    },
  },
]);

export const actions = style({
  '@layer': {
    [components]: createDialogActionsStyles({
      gap: dialogVars.spacing.actionsGap,
    }),
  },
});
