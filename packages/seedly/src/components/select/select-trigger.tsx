'use client';

import { Trigger, Icon } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ReactNode } from 'react';

import { buttonRecipe } from '../button/button.css';
import { useFormFieldItemContext, useFormFieldContext } from '../form-field';

import { openIndicator, selectTrigger } from './select-trigger.css';

export type SelectTriggerProps = ComponentPropsWithRef<typeof Trigger> & {
  icon?: ReactNode;
};

export function SelectTrigger({
  className,
  children,
  icon = null,
  ...props
}: SelectTriggerProps) {
  const { errors, label } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  return (
    <Trigger
      id={id}
      className={clsx(selectTrigger, className)}
      aria-invalid={errors ? 'true' : undefined}
      aria-label={label}
      {...props}
    >
      {children}
      <Icon asChild>
        <div
          // Mimic the Combobox style
          className={clsx(
            buttonRecipe({ size: 'sm', variant: 'bare' }),
            openIndicator({ fallback: !icon }),
          )}
        >
          {icon}
        </div>
      </Icon>
    </Trigger>
  );
}
