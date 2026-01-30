'use client';

import { Trigger, Icon } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ReactNode } from 'react';

import { buttonRecipe } from '../button/button.css';
import { useFormFieldItemContext, useFormFieldContext } from '../form-field';
import { inputAppearanceRecipe, type InputAppearanceVariants } from '../input';

import { openIndicatorRecipe, selectTrigger } from './select-trigger.css';

export type SelectTriggerProps = ComponentPropsWithRef<typeof Trigger> &
  Pick<InputAppearanceVariants, 'tone' | 'size' | 'variant'> & {
    icon?: ReactNode;
  };

export function SelectTrigger({
  className,
  children,
  icon = null,
  tone,
  size,
  variant,
  ...props
}: SelectTriggerProps) {
  const { errors, label, tone: contextTone } = useFormFieldContext();
  const { id } = useFormFieldItemContext();
  const resolvedTone = tone ?? contextTone;

  return (
    <Trigger
      id={id}
      className={clsx(
        inputAppearanceRecipe({ tone: resolvedTone, size, variant }),
        selectTrigger,
        className,
      )}
      aria-invalid={errors ? 'true' : undefined}
      aria-label={label}
      {...props}
    >
      {children}
      <Icon asChild>
        <div
          // Mimic the Combobox style
          className={clsx(
            buttonRecipe({ size: 'sm', variant: 'bare', tone }),
            openIndicatorRecipe({ fallback: !icon }),
          )}
        >
          {icon}
        </div>
      </Icon>
    </Trigger>
  );
}
