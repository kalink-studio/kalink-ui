'use client';

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

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputProps & {
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
    >
      <FormFieldItem>
        <FormFieldLabel disabled={disabled} required={required} size={size}>
          {label}
        </FormFieldLabel>

        <FormFieldControl>
          <TextareaInput
            name={name}
            className={className}
            disabled={disabled}
            aria-label={hideLabel ? label : undefined}
            {...rest}
          />
        </FormFieldControl>

        <FormFieldDescription>{description}</FormFieldDescription>
        <FormFieldError />
      </FormFieldItem>
    </FormField>
  );
}
