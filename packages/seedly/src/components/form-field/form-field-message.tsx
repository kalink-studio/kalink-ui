'use client';

import { HTMLAttributes, useEffect } from 'react';

import { useFormFieldContext } from './form-field-context';
import { formFieldMessageStyle } from './form-field.css';

export type FormFieldMessageProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  error?: boolean;
};

export function FormFieldMessage({
  className,
  children,
  id,
  error,
  ...props
}: FormFieldMessageProps) {
  const { registerMessageId, unRegisterMessageId } = useFormFieldContext();

  useEffect(() => {
    registerMessageId(id);

    return () => unRegisterMessageId(id);
  }, [id, registerMessageId, unRegisterMessageId]);

  return (
    <div id={id} className={formFieldMessageStyle} {...props}>
      {children}
    </div>
  );
}
