import { type StyleRule } from '@vanilla-extract/css';

interface DialogButtonStylesOptions {
  vars: Record<string, string>;
}

interface DialogBackdropStylesOptions {
  vars: Record<string, string>;
  backdropColor: string;
  transition: string;
  minBlockSize: string;
}

interface DialogPopupStylesOptions {
  vars: Record<string, string>;
  popupForeground: string;
  popupBackground: string;
  popupCorner: string;
  outline: string;
  outlineInverse?: string;
  transition?: string;
  inlineSize: string;
  maxInlineSize: string;
  marginBlockStart: string;
  paddingBlock: string;
  paddingInline: string;
}

interface DialogDescriptionStylesOptions {
  descriptionColor: string;
  marginBlock: string;
  marginInline: string;
}

interface DialogTitleStylesOptions {
  marginBlockStart: string;
  marginBlockEnd: string;
}

interface DialogActionsStylesOptions {
  gap: string;
}

export function createDialogButtonStyles(
  options: DialogButtonStylesOptions,
): StyleRule {
  return {
    vars: options.vars,
  };
}

export function createDialogBackdropStyles(
  options: DialogBackdropStylesOptions,
): StyleRule {
  return {
    vars: options.vars,

    minBlockSize: options.minBlockSize,

    position: 'fixed',
    insetBlock: '0',
    insetInline: '0',

    backgroundColor: options.backdropColor,
    opacity: '0.2',

    transition: options.transition,

    '@supports': {
      '(-webkit-touch-callout: none)': {
        position: 'absolute',
      },
    },

    '@media': {
      '(prefers-color-scheme: dark)': {
        opacity: '0.35',
      },
    },

    selectors: {
      '&[data-starting-style]': {
        opacity: '0',
      },

      '&[data-ending-style]': {
        opacity: '0',
      },
    },
  };
}

export function createDialogPopupStyles(
  options: DialogPopupStylesOptions,
): StyleRule {
  const media: Record<string, StyleRule> = {};

  if (options.outlineInverse) {
    media['(prefers-color-scheme: dark)'] = {
      outline: `1px solid ${options.outlineInverse}`,
    };
  }

  return {
    vars: options.vars,

    inlineSize: options.inlineSize,
    maxInlineSize: options.maxInlineSize,
    marginBlockStart: options.marginBlockStart,
    paddingBlock: options.paddingBlock,
    paddingInline: options.paddingInline,

    position: 'fixed',
    insetBlockStart: '50%',
    insetInlineStart: '50%',

    color: options.popupForeground,
    backgroundColor: options.popupBackground,
    borderRadius: options.popupCorner,
    outline: `1px solid ${options.outline}`,

    transform: 'translate(-50%, -50%)',
    transition: options.transition ?? undefined,

    '@media': media,

    selectors: {
      '&[data-starting-style]': {
        opacity: '0',
        transform: 'translate(-50%, -50%) scale(0.9)',
      },

      '&[data-ending-style]': {
        opacity: '0',
        transform: 'translate(-50%, -50%) scale(0.9)',
      },
    },
  };
}

export function createDialogTitleStyles(
  options: DialogTitleStylesOptions,
): StyleRule {
  return {
    marginBlockStart: options.marginBlockStart,
    marginBlockEnd: options.marginBlockEnd,
  };
}

export function createDialogDescriptionStyles(
  options: DialogDescriptionStylesOptions,
): StyleRule {
  return {
    marginBlock: options.marginBlock,
    marginInline: options.marginInline,
    color: options.descriptionColor,
  };
}

export function createDialogActionsStyles(
  options: DialogActionsStylesOptions,
): StyleRule {
  return {
    display: 'flex',
    justifyContent: 'end',
    gap: options.gap,
  };
}
