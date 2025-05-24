import { clsx } from 'clsx';
import { TextareaHTMLAttributes } from 'react';

import { useFormFieldContext } from '../form-field/form-field-context';
import { textarea } from '../textarea/textarea.css';

export function TextareaInput({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { errors } = useFormFieldContext();

  return (
    <textarea
      className={clsx(textarea, className)}
      aria-invalid={errors ? 'true' : undefined}
      {...props}
    />
  );
}
