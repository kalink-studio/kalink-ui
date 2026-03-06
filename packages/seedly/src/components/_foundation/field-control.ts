import { type StyleRule } from '@vanilla-extract/css';

export interface FieldStackStylesOptions {
  gap: string;
  alignItems?: 'start' | 'flex-start';
  inlineSize?: string;
  maxInlineSize?: string;
  position?: 'relative';
}

export function createFieldLabelStackStyles(
  options: FieldStackStylesOptions,
): StyleRule {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: options.alignItems,
    gap: options.gap,
    inlineSize: options.inlineSize,
    maxInlineSize: options.maxInlineSize,
    position: options.position,
  };
}

export interface FieldLabelStylesOptions {
  color: string;
  cursor?: 'default' | 'ew-resize';
}

export function createFieldLabelTextStyles(
  options: FieldLabelStylesOptions,
): StyleRule {
  return {
    color: options.color,
    cursor: options.cursor,
  };
}

export interface ChoiceLabelStylesOptions {
  color: string;
  gap: string;
  selectors?: Record<string, StyleRule>;
}

export function createChoiceLabelStyles(
  options: ChoiceLabelStylesOptions,
): StyleRule {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: options.gap,
    color: options.color,
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    selectors: options.selectors,
  };
}

export interface TextInputFocusStylesOptions {
  selector?: string;
  styles?: StyleRule;
  outlineColor: string;
  outlineOffset: string;
}

export interface TextInputStylesOptions {
  paddingInlineStart: string;
  paddingInlineEnd?: string;
  border: string;
  restingBorderColor: string;
  inlineSize: string;
  blockSize: string;
  borderRadius: string;
  backgroundColor: string;
  color: string;
  outline?: string;
  focus?: TextInputFocusStylesOptions | null;
  selectors?: Record<string, StyleRule>;
}

export interface TextInputTriggerStylesOptions extends TextInputStylesOptions {
  minInlineSize?: string;
  gap?: string;
  justifyContent?: 'space-between' | 'center' | 'flex-start';
  cursor?: 'default' | 'pointer';
}

export interface FieldTextInputStylesOptions {
  foreground: string;
  borderColor: string;
  backgroundColor: string;
  borderRadius: string;
  focusRingColor: string | null;
  focusRingOffset: string;
  paddingInlineStart: string;
  paddingInlineEnd?: string;
  inlineSize: string;
  blockSize: string;
  outline?: string;
  selectors?: Record<string, StyleRule>;
}

export interface FieldTextInputTriggerStylesOptions extends FieldTextInputStylesOptions {
  minInlineSize?: string;
  gap?: string;
  justifyContent?: 'space-between' | 'center' | 'flex-start';
  cursor?: 'default' | 'pointer';
}

export function createTextInputStyles(
  options: TextInputStylesOptions,
): StyleRule {
  const focusSelector = options.focus?.selector ?? '&:focus';

  const selectors: Record<string, StyleRule> = {
    ...(options.selectors ?? {}),
  };

  if (options.focus != null) {
    if (options.focus?.styles) {
      selectors[focusSelector] = options.focus.styles;
    } else {
      selectors[focusSelector] = {
        outline: `2px solid ${options.focus.outlineColor}`,
        outlineOffset: options.focus.outlineOffset,
      };
    }
  }

  return {
    paddingInlineStart: options.paddingInlineStart,
    paddingInlineEnd: options.paddingInlineEnd,
    marginBlock: '0',
    marginInline: '0',
    border: options.border,
    borderColor: options.restingBorderColor,
    inlineSize: options.inlineSize,
    blockSize: options.blockSize,
    borderRadius: options.borderRadius,
    backgroundColor: options.backgroundColor,
    color: options.color,
    outline: options.outline,
    selectors,
  };
}

export function createTextInputTriggerStyles(
  options: TextInputTriggerStylesOptions,
): StyleRule {
  const textInputStyles = createTextInputStyles(options);

  return {
    ...textInputStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: options.justifyContent ?? 'space-between',
    minInlineSize: options.minInlineSize,
    gap: options.gap,
    cursor: options.cursor ?? 'default',
    WebkitUserSelect: 'none',
    userSelect: 'none',
  };
}

export function createFieldTextInputStyles(
  options: FieldTextInputStylesOptions,
): StyleRule {
  return createTextInputStyles({
    paddingInlineStart: options.paddingInlineStart,
    paddingInlineEnd: options.paddingInlineEnd,
    border: `1px solid ${options.borderColor}`,
    restingBorderColor: options.borderColor,
    inlineSize: options.inlineSize,
    blockSize: options.blockSize,
    borderRadius: options.borderRadius,
    backgroundColor: options.backgroundColor,
    color: options.foreground,
    outline: options.outline,
    focus:
      options.focusRingColor === null
        ? null
        : {
            outlineColor: options.focusRingColor,
            outlineOffset: options.focusRingOffset,
          },
    selectors: options.selectors,
  });
}

export function createFieldTextInputTriggerStyles(
  options: FieldTextInputTriggerStylesOptions,
): StyleRule {
  return createTextInputTriggerStyles({
    paddingInlineStart: options.paddingInlineStart,
    paddingInlineEnd: options.paddingInlineEnd,
    border: `1px solid ${options.borderColor}`,
    restingBorderColor: options.borderColor,
    inlineSize: options.inlineSize,
    blockSize: options.blockSize,
    borderRadius: options.borderRadius,
    backgroundColor: options.backgroundColor,
    color: options.foreground,
    outline: options.outline,
    focus:
      options.focusRingColor === null
        ? null
        : {
            outlineColor: options.focusRingColor,
            outlineOffset: options.focusRingOffset,
          },
    selectors: options.selectors,
    minInlineSize: options.minInlineSize,
    gap: options.gap,
    justifyContent: options.justifyContent,
    cursor: options.cursor,
  });
}
