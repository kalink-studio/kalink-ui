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

export const dialogVars = createThemeContract({
  color: {
    backdrop: null,
    popupBackground: null,
    popupForeground: null,
    popupOutlineLight: null,
    popupOutlineDark: null,
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

const dialogColorDefaults = assignVars(dialogVars.color, {
  backdrop: sys.color.content.base,
  popupBackground: sys.color.container.base,
  popupForeground: sys.color.content.base,
  popupOutlineLight: sys.color.border.low,
  popupOutlineDark: sys.color.border.low,
  description: stateColor.mutedContent,
});

const dialogShapeDefaults = assignVars(dialogVars.shape, {
  popupCorner: sys.shape.corner.medium,
});

const dialogLayoutDefaults = assignVars(dialogVars.layout, {
  backdropMinBlockSize: '100dvh',
  popupInlineSize: '24rem',
  popupMaxInlineSize: `calc(100vw - ${sys.spacing[15]})`,
});

const dialogSpacingDefaults = assignVars(dialogVars.spacing, {
  popupMarginBlockStart: `calc(-1 * ${sys.spacing[12]})`,
  popupPaddingBlock: sys.spacing[10],
  popupPaddingInline: sys.spacing[10],
  titleMarginBlockStart: `calc(-1 * ${sys.spacing[3]})`,
  titleMarginBlockEnd: sys.spacing[2],
  descriptionMarginBlock: `0 ${sys.spacing[10]}`,
  descriptionMarginInline: '0',
  actionsGap: sys.spacing[8],
});

const dialogThemeDefaults = {
  ...dialogColorDefaults,
  ...dialogShapeDefaults,
  ...dialogLayoutDefaults,
  ...dialogSpacingDefaults,
};

export const button = style(
  createDialogButtonStyles({
    vars: dialogThemeDefaults,
  }),
);

export const backdrop = style(
  createDialogBackdropStyles({
    vars: dialogThemeDefaults,
    backdropColor: dialogVars.color.backdrop,
    transition: transition('opacity', {
      duration: 'short.4',
      easing: 'decelerate.emphasized',
    }),
    minBlockSize: dialogVars.layout.backdropMinBlockSize,
  }),
);

export const popup = style(
  createDialogPopupStyles({
    vars: dialogThemeDefaults,
    popupForeground: dialogVars.color.popupForeground,
    popupBackground: dialogVars.color.popupBackground,
    popupCorner: dialogVars.shape.popupCorner,
    popupOutlineLight: dialogVars.color.popupOutlineLight,
    popupOutlineDark: dialogVars.color.popupOutlineDark,
    inlineSize: dialogVars.layout.popupInlineSize,
    maxInlineSize: dialogVars.layout.popupMaxInlineSize,
    marginBlockStart: dialogVars.spacing.popupMarginBlockStart,
    paddingBlock: dialogVars.spacing.popupPaddingBlock,
    paddingInline: dialogVars.spacing.popupPaddingInline,
  }),
);

export const title = style([
  typography.title.large,
  createDialogTitleStyles({
    marginBlockStart: dialogVars.spacing.titleMarginBlockStart,
    marginBlockEnd: dialogVars.spacing.titleMarginBlockEnd,
  }),
]);

export const description = style([
  typography.body.large,
  createDialogDescriptionStyles({
    descriptionColor: dialogVars.color.description,
    marginBlock: dialogVars.spacing.descriptionMarginBlock,
    marginInline: dialogVars.spacing.descriptionMarginInline,
  }),
]);

export const actions = style(
  createDialogActionsStyles({
    gap: dialogVars.spacing.actionsGap,
  }),
);
