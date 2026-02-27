import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, transition, typography } from '../../styles';
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
    popupBackground: null,
    popupForeground: null,
    popupOutline: null,
    description: null,
  },
  shape: {
    popupCorner: null,
  },
  layout: {
    backdropMinBlockSize: null,
    popupInlineSize: null,
    popupMaxInlineSize: null,
  },
  spacing: {
    popupMarginBlockStart: null,
    popupPaddingBlock: null,
    popupPaddingInline: null,
    titleMarginBlockStart: null,
    titleMarginBlockEnd: null,
    descriptionMarginBlock: null,
    descriptionMarginInline: null,
    actionsGap: null,
  },
});

const alertDialogColorDefaults = assignVars(alertDialogVars.color, {
  backdrop: sys.color.content.base,
  popupBackground: sys.color.container.base,
  popupForeground: sys.color.content.base,
  popupOutline: sys.color.border.low,
  description: stateColor.mutedContent,
});

const alertDialogShapeDefaults = assignVars(alertDialogVars.shape, {
  popupCorner: sys.shape.corner.medium,
});

const alertDialogLayoutDefaults = assignVars(alertDialogVars.layout, {
  backdropMinBlockSize: '100dvh',
  popupInlineSize: '24rem',
  popupMaxInlineSize: `calc(100vw - ${sys.spacing[15]})`,
});

const alertDialogSpacingDefaults = assignVars(alertDialogVars.spacing, {
  popupMarginBlockStart: `calc(-1 * ${sys.spacing[12]})`,
  popupPaddingBlock: sys.spacing[10],
  popupPaddingInline: sys.spacing[10],
  titleMarginBlockStart: `calc(-1 * ${sys.spacing[3]})`,
  titleMarginBlockEnd: sys.spacing[2],
  descriptionMarginBlock: `0 ${sys.spacing[10]}`,
  descriptionMarginInline: '0',
  actionsGap: sys.spacing[8],
});

const alertDialogThemeDefaults = {
  ...alertDialogColorDefaults,
  ...alertDialogShapeDefaults,
  ...alertDialogLayoutDefaults,
  ...alertDialogSpacingDefaults,
};

export const button = style(
  createDialogButtonStyles({
    vars: alertDialogThemeDefaults,
  }),
);

export const backdrop = style(
  createDialogBackdropStyles({
    vars: alertDialogThemeDefaults,
    backdropColor: alertDialogVars.color.backdrop,
    transition: transition('opacity', {
      duration: 'short.4',
      easing: 'standard',
    }),
    minBlockSize: alertDialogVars.layout.backdropMinBlockSize,
  }),
);

export const popup = style(
  createDialogPopupStyles({
    vars: alertDialogThemeDefaults,
    popupForeground: alertDialogVars.color.popupForeground,
    popupBackground: alertDialogVars.color.popupBackground,
    popupCorner: alertDialogVars.shape.popupCorner,
    popupOutlineLight: alertDialogVars.color.popupOutline,
    popupOutlineDark: alertDialogVars.color.popupOutline,
    inlineSize: alertDialogVars.layout.popupInlineSize,
    maxInlineSize: alertDialogVars.layout.popupMaxInlineSize,
    marginBlockStart: alertDialogVars.spacing.popupMarginBlockStart,
    paddingBlock: alertDialogVars.spacing.popupPaddingBlock,
    paddingInline: alertDialogVars.spacing.popupPaddingInline,
  }),
);

export const title = style([
  typography.title.large,
  createDialogTitleStyles({
    marginBlockStart: alertDialogVars.spacing.titleMarginBlockStart,
    marginBlockEnd: alertDialogVars.spacing.titleMarginBlockEnd,
  }),
]);

export const description = style([
  typography.body.large,
  createDialogDescriptionStyles({
    descriptionColor: alertDialogVars.color.description,
    marginBlock: alertDialogVars.spacing.descriptionMarginBlock,
    marginInline: alertDialogVars.spacing.descriptionMarginInline,
  }),
]);

export const actions = style(
  createDialogActionsStyles({
    gap: alertDialogVars.spacing.actionsGap,
  }),
);
