'use client';

import { mergeRefs } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ReactNode, RefObject, useRef } from 'react';

import { useFormFieldContext } from '../form-field/form-field-context';

import { InputWrapper } from './input-wrapper';
import { InputAppearanceVariants, input, inputAddornment } from './input.css';

import type { Responsive } from '../../styles';

export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputRef?: RefObject<HTMLInputElement>;
} & Omit<InputAppearanceVariants, 'size'> & {
    size?: Responsive<NonNullable<InputAppearanceVariants['size']>>;
  };

export function Input({
  className,
  type = 'text',
  startAdornment,
  endAdornment,
  disabled,
  inputRef,
  children,
  variant,
  size,
  tone,
  ref,
  ...props
}: InputProps) {
  const innerRef = useRef<HTMLInputElement>(null);
  const { errors, tone: contextTone } = useFormFieldContext();
  const resolvedTone = tone ?? contextTone;

  return (
    <InputWrapper
      ref={ref}
      inputRef={innerRef}
      disabled={disabled}
      variant={variant}
      size={size}
      tone={resolvedTone}
    >
      {startAdornment && (
        <div className={inputAddornment}>{startAdornment}</div>
      )}
      <input
        ref={mergeRefs([inputRef, innerRef])}
        type={type}
        className={clsx(input, className)}
        disabled={disabled}
        aria-invalid={errors ? 'true' : undefined}
        {...props}
      />
      {endAdornment && <div className={inputAddornment}>{endAdornment}</div>}
    </InputWrapper>
  );
}
