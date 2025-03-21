import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ComponentType, ReactNode } from 'react';

import {
  buttonEndSlot,
  buttonLabel,
  buttonRecipe,
  buttonStartSlot,
  ButtonVariants,
} from './button.css';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type ButtonTypes = 'button' | 'a' | ComponentType<any>;

type ButtonProps<TUse extends ButtonTypes> = PolymorphicComponentProps<TUse> &
  ButtonVariants & {
    startSlot?: ReactNode;
    endSlot?: ReactNode;
    children?: string;
  };

export function Button<TUse extends ButtonTypes>(props: ButtonProps<TUse>) {
  const {
    use: Comp = 'button',
    className,
    variant,
    children,
    startSlot,
    endSlot,
    size = 'md',
    ...rest
  } = props;

  return (
    <Comp
      className={clsx(buttonRecipe({ variant, size }), className)}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      {...(rest as any)}
    >
      {startSlot && <span className={clsx(buttonStartSlot)}>{startSlot}</span>}
      <span className={clsx(buttonLabel({ size }))}>{children}</span>
      {endSlot && <span className={clsx(buttonEndSlot)}>{endSlot}</span>}
    </Comp>
  );
}
