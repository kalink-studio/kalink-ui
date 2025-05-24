'use client';

import { useFormFieldContext } from './form-field-context';
import { useFormFieldItemContext } from './form-field-item-context';
import { FormFieldMessage, FormFieldMessageProps } from './form-field-message';

export type FormFieldErrorProps = Omit<FormFieldMessageProps, 'id'>;

export function FormFieldError(props: FormFieldErrorProps) {
  const { errors, hideErrorMessage } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  if (!errors || hideErrorMessage) {
    return null;
  }

  return (
    <FormFieldMessage id={`${id}-error`} error {...props}>
      {errors}
    </FormFieldMessage>
  );
}
