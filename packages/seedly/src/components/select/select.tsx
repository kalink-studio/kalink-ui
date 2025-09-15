import { Value } from '@radix-ui/react-select';
import { clsx } from 'clsx';
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
import { selectStyle } from './select.css';

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
    >
      <FormFieldItem className={clsx(selectStyle, className)}>
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
            >
              <Value placeholder={placeholder} className="test" />
            </SelectTrigger>
          </FormFieldControl>
          <SelectContent container={container}>{children}</SelectContent>
        </SelectRoot>
        <FormFieldDescription>{description}</FormFieldDescription>
        <FormFieldError />
      </FormFieldItem>
    </FormField>
  );
}
