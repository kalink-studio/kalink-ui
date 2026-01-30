import { Value } from '@radix-ui/react-select';
import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldItem,
  FormFieldLabel,
} from '../form-field';
import { InputAppearanceVariants } from '../input';

import { SelectContent } from './select-content';
import { SelectRoot } from './select-root';
import { SelectTrigger } from './select-trigger';

export type SelectProps = ComponentPropsWithoutRef<typeof SelectRoot> &
  Pick<ComponentPropsWithoutRef<typeof Value>, 'placeholder'> &
  Pick<
    ComponentPropsWithRef<typeof SelectTrigger>,
    'onBlur' | 'onFocus' | 'ref'
  > &
  InputAppearanceVariants & {
    name: string;
    label: string;
    description?: string;
    container?: HTMLElement | null | false;
    hideLabel?: boolean;
    errors: string;
    hideErrorMessage?: boolean;
    className?: string;
  };

export function Select({
  placeholder,
  label,
  children,
  container,
  description,
  name,
  hideErrorMessage = false,
  hideLabel = false,
  disabled,
  errors,
  onBlur,
  onFocus,
  required,
  size = 'md',
  ref,
  className,
  tone,
  variant,
  ...props
}: SelectProps) {
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

        <SelectRoot disabled={disabled} {...props}>
          <FormFieldControl>
            <SelectTrigger
              ref={ref}
              title={hideLabel ? label : undefined}
              onBlur={onBlur}
              onFocus={onFocus}
              aria-label={hideLabel ? label : undefined}
              tone={tone}
              size={size}
              variant={variant}
            >
              <Value placeholder={placeholder} />
            </SelectTrigger>
          </FormFieldControl>
          <SelectContent container={container}>{children}</SelectContent>
        </SelectRoot>
        <FormFieldDescription size={size}>{description}</FormFieldDescription>
        <FormFieldError size={size} />
      </FormFieldItem>
    </FormField>
  );
}
