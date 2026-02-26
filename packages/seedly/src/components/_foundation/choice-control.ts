import { type StyleRule } from '@vanilla-extract/css';

import { sys } from '../../styles';

export interface ChoiceControlStylesOptions {
  size?: string;
  borderRadius?: string;
  uncheckedBorderColor?: string;
  checkedBackgroundColor?: string;
  focusRingColor?: string;
  focusOutlineOffset?: string;
  uncheckedSelector?: string;
  checkedSelector?: string;
  focusSelector?: string;
}

export function createChoiceControlStyles(
  options: ChoiceControlStylesOptions = {},
): StyleRule {
  const size = options.size ?? sys.spacing[9];
  const borderRadius = options.borderRadius ?? sys.shape.corner.small;
  const uncheckedBorderColor =
    options.uncheckedBorderColor ?? sys.color.border.high;
  const checkedBackgroundColor =
    options.checkedBackgroundColor ?? sys.color.content.base;
  const focusRingColor = options.focusRingColor ?? sys.color.tone.primary;
  const uncheckedSelector = options.uncheckedSelector ?? '&[data-unchecked]';
  const checkedSelector = options.checkedSelector ?? '&[data-checked]';
  const focusSelector = options.focusSelector ?? '&:focus-visible';

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    inlineSize: size,
    blockSize: size,
    paddingBlock: '0',
    paddingInline: '0',
    marginBlock: '0',
    marginInline: '0',

    borderRadius,
    outline: '0',
    border: 'none',

    selectors: {
      [uncheckedSelector]: {
        border: `1px solid ${uncheckedBorderColor}`,
        backgroundColor: 'transparent',
      },

      [checkedSelector]: {
        backgroundColor: checkedBackgroundColor,
      },

      [focusSelector]: {
        outline: `2px solid ${focusRingColor}`,
        outlineOffset: options.focusOutlineOffset ?? sys.spacing[1],
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
