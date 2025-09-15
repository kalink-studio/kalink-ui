'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType, useId } from 'react';

import { useFormFieldContext } from './form-field-context';
import { FormFieldItemContextProvider } from './form-field-item-context';
import { formFieldStyle } from './form-field.css';

export type FormFieldItemProps<TUse extends ElementType = 'div'> =
  PolymorphicComponentProps<TUse>;

export function FormFieldItem<TUse extends ElementType = 'div'>(
  props: FormFieldItemProps<TUse>,
) {
  const id = useId();
  const { errors, disabled } = useFormFieldContext();

  const { use: Comp = 'div', className, children, ...rest } = props;

  return (
    <FormFieldItemContextProvider value={{ id }}>
      <Comp
        className={clsx(
          formFieldStyle({ error: !!errors, disabled }),
          className,
        )}
        {...rest}
      >
        {children}
      </Comp>
    </FormFieldItemContextProvider>
  );
}
