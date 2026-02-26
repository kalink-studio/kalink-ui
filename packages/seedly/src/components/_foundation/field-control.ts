import { type StyleRule } from '@vanilla-extract/css';

import { sys } from '../../styles';

export interface FieldStackStylesOptions {
  gap?: string;
  alignItems?: 'start' | 'flex-start';
  inlineSize?: string;
  maxInlineSize?: string;
  position?: 'relative';
}

export function createFieldStackStyles(
  options: FieldStackStylesOptions = {},
): StyleRule {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: options.alignItems,
    gap: options.gap ?? sys.spacing[2],
    inlineSize: options.inlineSize,
    maxInlineSize: options.maxInlineSize,
    position: options.position,
  };
}

export interface FieldLabelStylesOptions {
  color?: string;
  cursor?: 'default' | 'ew-resize';
}

export function createFieldLabelStyles(
  options: FieldLabelStylesOptions = {},
): StyleRule {
  return {
    color: options.color ?? sys.color.content.base,
    cursor: options.cursor,
  };
}

export interface TextInputFocusStylesOptions {
  selector?: string;
  styles?: StyleRule;
  outlineColor?: string;
  outlineOffset?: string;
}

export interface TextInputStylesOptions {
  paddingInlineStart?: string;
  paddingInlineEnd?: string;
  border?: string;
  restingBorderColor?: string;
  inlineSize?: string;
  blockSize?: string;
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
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
  foreground?: string;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  focusRingColor?: string | null;
  paddingInlineStart?: string;
  paddingInlineEnd?: string;
  inlineSize?: string;
  blockSize?: string;
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
  options: TextInputStylesOptions = {},
): StyleRule {
  const border = options.border ?? `1px solid ${sys.color.border.base}`;
  const focusSelector = options.focus?.selector ?? '&:focus';

  const selectors: Record<string, StyleRule> = {
    ...(options.selectors ?? {}),
  };

  if (options.focus !== null) {
    if (options.focus?.styles) {
      selectors[focusSelector] = options.focus.styles;
    } else {
      selectors[focusSelector] = {
        outline: `2px solid ${options.focus?.outlineColor ?? sys.color.tone.primary}`,
        outlineOffset: options.focus?.outlineOffset ?? '-1px',
      };
    }
  }

  return {
    paddingInlineStart: options.paddingInlineStart ?? sys.spacing[7],
    paddingInlineEnd: options.paddingInlineEnd,
    marginBlock: '0',
    marginInline: '0',
    border,
    borderColor:
      options.restingBorderColor ??
      'color-mix(in srgb, currentColor 32%, transparent)',
    inlineSize: options.inlineSize ?? '100%',
    blockSize: options.blockSize ?? sys.spacing[14],
    borderRadius: options.borderRadius ?? sys.shape.corner.medium,
    backgroundColor: options.backgroundColor ?? sys.color.surface.base,
    color: options.color ?? sys.color.content.base,
    outline: options.outline,
    selectors,
  };
}

export function createTextInputTriggerStyles(
  options: TextInputTriggerStylesOptions = {},
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
  options: FieldTextInputStylesOptions = {},
): StyleRule {
  const borderColor = options.borderColor ?? sys.color.border.base;

  return createTextInputStyles({
    paddingInlineStart: options.paddingInlineStart,
    paddingInlineEnd: options.paddingInlineEnd,
    border: `1px solid ${borderColor}`,
    restingBorderColor: borderColor,
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
          },
    selectors: options.selectors,
  });
}

export function createFieldTextInputTriggerStyles(
  options: FieldTextInputTriggerStylesOptions = {},
): StyleRule {
  const borderColor = options.borderColor ?? sys.color.border.base;

  return createTextInputTriggerStyles({
    paddingInlineStart: options.paddingInlineStart,
    paddingInlineEnd: options.paddingInlineEnd,
    border: `1px solid ${borderColor}`,
    restingBorderColor: borderColor,
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
          },
    selectors: options.selectors,
    minInlineSize: options.minInlineSize,
    gap: options.gap,
    justifyContent: options.justifyContent,
    cursor: options.cursor,
  });
}
