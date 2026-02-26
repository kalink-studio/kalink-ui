import { type StyleRule } from '@vanilla-extract/css';

export interface PressableBaseStylesOptions {
  blockSize?: string;
  inlineSize?: string;
  minInlineSize?: string;
  gap?: string;
  paddingBlock?: string;
  paddingInline?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
  cursor?: string;
  webkitUserSelect?: 'none';
}

export function createPressableBaseStyles({
  blockSize,
  inlineSize,
  minInlineSize,
  gap,
  paddingBlock,
  paddingInline,
  border,
  borderRadius,
  backgroundColor,
  color,
  cursor,
  webkitUserSelect,
}: PressableBaseStylesOptions): StyleRule {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap,

    blockSize,
    inlineSize,
    minInlineSize,
    paddingBlock,
    paddingInline,
    marginBlock: '0',
    marginInline: '0',
    color,

    outline: '0',
    border,
    borderRadius,
    backgroundColor,

    cursor,
    WebkitUserSelect: webkitUserSelect,
    userSelect: 'none',
  };
}

export interface InteractiveStateStylesOptions {
  hover?: {
    selector?: string;
    backgroundColor: string;
  };
  active?: {
    selector?: string;
    styles: StyleRule;
  };
  popupOpen?: {
    selector?: string;
    styles: StyleRule;
  };
  pressed?: {
    selector?: string;
    styles: StyleRule;
  };
  focusVisible?: {
    selector?: string;
    outlineColor: string;
    outlineOffset?: string;
    styles?: StyleRule;
  };
  disabled?: {
    selector?: string;
    styles: StyleRule;
  };
}

export function createInteractiveStateStyles(
  options: InteractiveStateStylesOptions,
): StyleRule {
  const selectors: Record<string, StyleRule> = {};

  if (options.hover) {
    const selector = options.hover.selector ?? '&:hover';

    selectors[selector] = {
      '@media': {
        '(hover: hover)': {
          backgroundColor: options.hover.backgroundColor,
        },
      },
    };
  }

  if (options.active) {
    const selector = options.active.selector ?? '&:active';

    selectors[selector] = options.active.styles;
  }

  if (options.popupOpen) {
    const selector = options.popupOpen.selector ?? '&[data-popup-open]';

    selectors[selector] = options.popupOpen.styles;
  }

  if (options.pressed) {
    const selector = options.pressed.selector ?? '&[data-pressed]';

    selectors[selector] = options.pressed.styles;
  }

  if (options.focusVisible) {
    const selector = options.focusVisible.selector ?? '&:focus-visible';

    selectors[selector] = {
      ...options.focusVisible.styles,
      outline: `2px solid ${options.focusVisible.outlineColor}`,
      outlineOffset: options.focusVisible.outlineOffset ?? '-1px',
    };
  }

  if (options.disabled) {
    const selector = options.disabled.selector ?? '&[data-disabled]';

    selectors[selector] = options.disabled.styles;
  }

  if (Object.keys(selectors).length === 0) {
    return {};
  }

  return {
    selectors,
  };
}
