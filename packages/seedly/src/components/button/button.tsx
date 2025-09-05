import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ComponentType, ElementType, ReactNode } from 'react';

import { buttonLabel, buttonSlot, ButtonVariants } from './button.css';
import { buttonResponsive } from './button.responsive';

import type { Responsive } from '../../styles/responsive';

function getBase<T extends string | number>(value: Responsive<T> | undefined) {
  if (value == null) {
    return undefined as T | undefined;
  }

  if (Array.isArray(value)) {
    return (value[0] ?? undefined) as T | undefined;
  }

  if (typeof value === 'object') {
    const obj = value as Partial<Record<string, T>> & { xs?: T };
    return obj.xs as T | undefined;
  }

  return value as T;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ButtonTypes = 'button' | 'a' | ComponentType<any>;

export type ButtonProps<TUse extends ButtonTypes> =
  PolymorphicComponentProps<TUse> &
    Omit<ButtonVariants, 'size' | 'variant'> & {
      startSlot?: ReactNode;
      endSlot?: ReactNode;
      children?: string;
      size?: Responsive<NonNullable<ButtonVariants['size']>>;
      variant?: Responsive<NonNullable<ButtonVariants['variant']>>;
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
        <ButtonLabel use="span" size={getBase(size) ?? 'md'}>
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
  PolymorphicComponentProps<TUse> &
    Omit<ButtonVariants, 'size' | 'variant'> & {
      size?: Responsive<NonNullable<ButtonVariants['size']>>;
      variant?: Responsive<NonNullable<ButtonVariants['variant']>>;
    };

export function ButtonRoot<TUse extends ButtonTypes>(
  props: ButtonRootProps<TUse>,
) {
  const { use: Comp = 'button', className, variant, size, ...rest } = props;

  return (
    <Comp
      className={clsx(buttonResponsive({ variant, size }), className)}
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
