'use client';

import { useFormFieldItemContext } from './form-field-item-context';
import { FormFieldMessage, FormFieldMessageProps } from './form-field-message';

export type FormFieldDescriptionProps = Omit<FormFieldMessageProps, 'id'>;

export function FormFieldDescription(props: FormFieldDescriptionProps) {
  const { id } = useFormFieldItemContext();

  if (!props.children) {
    return;
  }

  return <FormFieldMessage id={`${id}-description`} {...props} />;
}
