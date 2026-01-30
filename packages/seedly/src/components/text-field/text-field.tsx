'use client';

import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldItem,
  FormFieldLabel,
} from '../form-field';
import { Input, InputProps } from '../input';

export type TextFieldProps = InputProps & {
  name: string;
  label: string;
  description?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  errors?: string | null;
  hideErrorMessage?: boolean;
};

export function TextField({
  description,
  disabled,
  label,
  name,
  hideLabel = false,
  errors,
  required,
  hideErrorMessage = false,
  size = 'md',
  className,
  tone,
  ...rest
}: TextFieldProps) {
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
      <FormFieldItem className={className}>
        <FormFieldLabel required={required} disabled={disabled} size={size}>
          {label}
        </FormFieldLabel>

        <FormFieldControl>
          <Input
            name={name}
            disabled={disabled}
            required={required}
            size={size}
            {...rest}
          />
        </FormFieldControl>

        <FormFieldDescription size={size}>{description}</FormFieldDescription>
        <FormFieldError size={size} />
      </FormFieldItem>
    </FormField>
  );
}
