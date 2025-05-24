import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { label, LabelVariants } from './label.css';

export type LabelProps = ComponentPropsWithRef<'label'> & {
  required?: boolean;
} & LabelVariants;

export function Label({
  className,
  disabled,
  error,
  size = 'md',
  ...props
}: LabelProps) {
  return (
    <label
      className={clsx(label({ disabled, error, size }), className)}
      {...props}
    />
  );
}
