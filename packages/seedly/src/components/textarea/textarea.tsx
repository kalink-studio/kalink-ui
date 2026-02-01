'use client';

import { clsx } from 'clsx';
import { TextareaHTMLAttributes } from 'react';

import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldItem,
  FormFieldLabel,
} from '../form-field';
import { InputProps } from '../input';

import { TextareaInput } from './textarea-input';
import { textareaStyle } from './textarea.css';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<InputProps, 'type' | 'startAdornment' | 'endAdornment' | 'inputRef'> & {
    name: string;
    label: string;
    description?: string;
    hideLabel?: boolean;
    errors: string;
    hideErrorMessage?: boolean;
  };

export function Textarea({
  className,
  description,
  disabled,
  label,
  name,
  hideLabel = false,
  errors,
  required,
  hideErrorMessage = false,
  size = 'md',
  variant = 'outlined',
  tone,
  ...rest
}: TextareaProps) {
  return (
    <FormField
      name={name}
      label={label}
      errors={errors}
      hideErrorMessage={hideErrorMessage}
      disabled={disabled}
      hideLabel={hideLabel}
      tone={tone}
    >
      <FormFieldItem className={clsx(textareaStyle, className)}>
        <FormFieldLabel disabled={disabled} required={required} size={size}>
          {label}
        </FormFieldLabel>

        <FormFieldControl>
          <TextareaInput
            name={name}
            className={className}
            disabled={disabled}
            aria-label={hideLabel ? label : undefined}
            size={size}
            variant={variant}
            tone={tone}
            {...rest}
          />
        </FormFieldControl>

        <FormFieldDescription size={size}>{description}</FormFieldDescription>
        <FormFieldError size={size} />
      </FormFieldItem>
    </FormField>
  );
}
