import { clsx } from 'clsx';

import { visuallyHidden } from '../../styles';
import { Label, LabelProps } from '../label';

import { useFormFieldContext } from './form-field-context';
import { useFormFieldItemContext } from './form-field-item-context';

export function FormFieldLabel({
  className,
  children,
  required,
  ...props
}: LabelProps) {
  const { errors, hideLabel } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  return (
    <Label
      className={clsx(visuallyHidden({ hidden: hideLabel }), className)}
      htmlFor={id}
      error={!!errors}
      required={required}
      {...props}
    >{`${children}${required ? ' *' : ''}`}</Label>
  );
}
