'use client';

import {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactElement,
} from 'react';

import { useFormFieldContext } from './form-field-context';
import { useFormFieldItemContext } from './form-field-item-context';

export interface FormFieldControlProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
}

export function FormFieldControl({
  children,
  ...props
}: FormFieldControlProps) {
  const { messageIds, errors } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  if (!isValidElement(children)) {
    throw new Error('FormFieldControl must have a valid child');
  }

  return cloneElement(children, {
    id,
    'aria-describedby': messageIds.join(' ') || undefined,
    'aria-invalid': !!errors || undefined,
    ...props,
  });
}
