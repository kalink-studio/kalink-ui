import { type StyleRule } from '@vanilla-extract/css';

export interface ChoiceControlStylesOptions {
  size: string;
  borderRadius: string;
  uncheckedBorderColor: string;
  checkedBackgroundColor: string;
  focusRingColor: string;
  focusOutlineOffset: string;
  uncheckedSelector?: string;
  checkedSelector?: string;
  focusSelector?: string;
}

export function createChoiceControlStyles(
  options: ChoiceControlStylesOptions,
): StyleRule {
  const uncheckedSelector = options.uncheckedSelector ?? '&[data-unchecked]';
  const checkedSelector = options.checkedSelector ?? '&[data-checked]';
  const focusSelector = options.focusSelector ?? '&:focus-visible';

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    inlineSize: options.size,
    blockSize: options.size,
    paddingBlock: '0',
    paddingInline: '0',
    marginBlock: '0',
    marginInline: '0',

    borderRadius: options.borderRadius,
    outline: '0',
    border: 'none',

    selectors: {
      [uncheckedSelector]: {
        border: `1px solid ${options.uncheckedBorderColor}`,
        backgroundColor: 'transparent',
      },

      [checkedSelector]: {
        backgroundColor: options.checkedBackgroundColor,
      },

      [focusSelector]: {
        outline: `2px solid ${options.focusRingColor}`,
        outlineOffset: options.focusOutlineOffset,
      },
    },
  };
}

export interface ChoiceIndicatorStylesOptions {
  color?: string;
  alignCenter?: boolean;
  hideUncheckedSelector?: string;
  before?: {
    size: string;
    backgroundColor: string;
    borderRadius: string;
  };
}

export function createChoiceIndicatorStyles(
  options: ChoiceIndicatorStylesOptions = {},
): StyleRule {
  const selectors: Record<string, StyleRule> = {};
  const hideUncheckedSelector =
    options.hideUncheckedSelector ?? '&[data-unchecked]';

  selectors[hideUncheckedSelector] = {
    display: 'none',
  };

  if (options.before) {
    selectors['&::before'] = {
      content: "''",

      inlineSize: options.before.size,
      blockSize: options.before.size,

      borderRadius: options.before.borderRadius,
      backgroundColor: options.before.backgroundColor,
    };
  }

  return {
    display: 'flex',
    alignItems: options.alignCenter ? 'center' : undefined,
    justifyContent: options.alignCenter ? 'center' : undefined,

    color: options.color,

    selectors,
  };
}
