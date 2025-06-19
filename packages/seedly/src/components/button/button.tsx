import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ComponentType, ElementType, ReactNode } from 'react';

import {
  buttonLabel,
  buttonRecipe,
  buttonSlot,
  ButtonVariants,
} from './button.css';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ButtonTypes = 'button' | 'a' | ComponentType<any>;

export type ButtonProps<TUse extends ButtonTypes> =
  PolymorphicComponentProps<TUse> &
    ButtonVariants & {
      startSlot?: ReactNode;
      endSlot?: ReactNode;
      children?: string;
    };

export function Button<TUse extends ButtonTypes>(props: ButtonProps<TUse>) {
  const { children, startSlot, endSlot, size = 'md', ...rest } = props;

  return (
    <ButtonRoot {...rest} size={size}>
      {startSlot && (
        <ButtonSlot use="span" position="start">
          {startSlot}
        </ButtonSlot>
      )}
      {children && (
        <ButtonLabel use="span" size={size}>
          {children}
        </ButtonLabel>
      )}
      {endSlot && (
        <ButtonSlot use="span" position="end">
          {endSlot}
        </ButtonSlot>
      )}
    </ButtonRoot>
  );
}

export type ButtonRootProps<TUse extends ButtonTypes> =
  PolymorphicComponentProps<TUse> & ButtonVariants;

export function ButtonRoot<TUse extends ButtonTypes>(
  props: ButtonRootProps<TUse>,
) {
  const { use: Comp = 'button', className, variant, size, ...rest } = props;

  return (
    <Comp
      className={clsx(buttonRecipe({ variant, size }), className)}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      {...(rest as any)}
    />
  );
}

export type ButtonLabelProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    children?: ReactNode;
    size?: ButtonVariants['size'];
  };

export function ButtonLabel<TUse extends ElementType>(
  props: ButtonLabelProps<TUse>,
) {
  const { use: Comp = 'span', children, className, size, ...rest } = props;

  return (
    <Comp className={clsx(buttonLabel({ size }), className)} {...rest}>
      {children}
    </Comp>
  );
}

export type ButtonSlotProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    children?: ReactNode;
    position?: 'start' | 'end';
  };

export function ButtonSlot<TUse extends ElementType>(
  props: ButtonSlotProps<TUse>,
) {
  const {
    use: Comp = 'span',
    children,
    position = 'start',
    className,
    ...rest
  } = props;

  return (
    <Comp className={clsx(buttonSlot({ position }), className)} {...rest}>
      {children}
    </Comp>
  );
}
