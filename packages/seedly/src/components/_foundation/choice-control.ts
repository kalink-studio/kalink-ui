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
  animationType?: 'center-out' | 'fill-in';
  indicatorSize?: string;
  indicatorColor?: string;
}

export function createChoiceControlStyles(
  options: ChoiceControlStylesOptions,
): StyleRule {
  const uncheckedSelector = options.uncheckedSelector ?? '&[data-unchecked]';
  const checkedSelector = options.checkedSelector ?? '&[data-checked]';
  const focusSelector = options.focusSelector ?? '&:focus-visible';
  const animationType = options.animationType ?? 'center-out';

  const baseStyles: StyleRule = {
    boxSizing: 'border-box',
    position: 'relative',
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
    border: '1px solid transparent',
    overflow: 'hidden',
  };

  if (animationType === 'fill-in') {
    const shadowSize = options.indicatorSize
      ? `calc((${options.size} - 2px - ${options.indicatorSize}) / 2)`
      : `calc((${options.size} - 2px) / 2)`;

    return {
      ...baseStyles,
      transition:
        'border-color 250ms ease, box-shadow 300ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 250ms ease',

      '@media': {
        '(prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      },

      selectors: {
        [uncheckedSelector]: {
          borderColor: options.uncheckedBorderColor,
          backgroundColor: 'transparent',
          boxShadow: `inset 0 0 0 0 ${options.uncheckedBorderColor}`,
        },

        [checkedSelector]: {
          borderColor: options.checkedBackgroundColor,
          backgroundColor: options.indicatorColor ?? 'transparent',
          boxShadow: `inset 0 0 0 ${shadowSize} ${options.checkedBackgroundColor}`,
        },

        [focusSelector]: {
          outline: `2px solid ${options.focusRingColor}`,
          outlineOffset: options.focusOutlineOffset,
        },
      },
    };
  }

  return {
    ...baseStyles,
    transition: 'border-color 250ms ease',

    '::before': {
      content: "''",
      position: 'absolute',
      inset: '-1px',
      borderRadius: 'inherit',
      backgroundColor: options.uncheckedBorderColor,
      transform: 'scale(0)',
      opacity: 0,
      transition:
        'transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 250ms ease, background-color 250ms ease',
      pointerEvents: 'none',
      zIndex: 0,
    },

    '@media': {
      '(prefers-reduced-motion: reduce)': {
        '::before': {
          transition: 'none',
        },
      },
    },

    selectors: {
      [uncheckedSelector]: {
        borderColor: options.uncheckedBorderColor,
        backgroundColor: 'transparent',
      },

      [checkedSelector]: {
        borderColor: options.checkedBackgroundColor,
        backgroundColor: 'transparent',
      },

      [`${checkedSelector}::before`]: {
        transform: 'scale(1)',
        opacity: 1,
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
    opacity: 0,
    transform: 'scale(0.8)',
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
    position: 'relative',
    zIndex: 1,

    opacity: 1,
    transform: 'scale(1)',
    transition:
      'transform 200ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 200ms ease, clip-path 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',

    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },

    selectors: {
      ...selectors,
      '&[data-starting-style]': {
        opacity: 0,
        transform: 'scale(0.8)',
      },
      '&[data-ending-style]': {
        opacity: 0,
        transform: 'scale(0.8)',
      },
    },
  };
}
