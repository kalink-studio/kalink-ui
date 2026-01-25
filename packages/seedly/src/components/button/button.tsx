import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ComponentType, ElementType, ReactNode } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';

import { buttonLabel, buttonSlot, ButtonVariants } from './button.css';
import { buttonResponsive } from './button.responsive';

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
      tone?: Responsive<NonNullable<ButtonVariants['tone']>>;
    };

export function Button<TUse extends ButtonTypes>(props: ButtonProps<TUse>) {
  const { children, startSlot, endSlot, size = 'md', tone, ...rest } = props;

  return (
    <ButtonRoot {...rest} size={size} tone={tone}>
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
  PolymorphicComponentProps<TUse> &
    Omit<ButtonVariants, 'size' | 'variant'> & {
      size?: Responsive<NonNullable<ButtonVariants['size']>>;
      variant?: Responsive<NonNullable<ButtonVariants['variant']>>;
      tone?: Responsive<NonNullable<ButtonVariants['tone']>>;
    };

export function ButtonRoot<TUse extends ButtonTypes>(
  props: ButtonRootProps<TUse>,
) {
  const {
    use: Comp = 'button',
    className,
    variant,
    size,
    tone,
    ...rest
  } = props;

  return (
    <Comp
      className={clsx(buttonResponsive({ variant, size, tone }), className)}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      {...(rest as any)}
    />
  );
}

export type ButtonLabelProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    children?: ReactNode;
    size?: Responsive<NonNullable<ButtonVariants['size']>>;
  };

export function ButtonLabel<TUse extends ElementType>(
  props: ButtonLabelProps<TUse>,
) {
  const { use: Comp = 'span', children, className, size, ...rest } = props;
  const baseSize = getResponsiveBase(size) ?? 'md';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'label',
    size: typographySize,
  });

  return (
    <Comp
      className={clsx(
        buttonLabel({ size: baseSize }),
        typographyOverrides,
        className,
      )}
      {...rest}
    >
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
