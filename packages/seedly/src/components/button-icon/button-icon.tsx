import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';

import { ButtonTypes } from '../button/button';

import { buttonIcon, ButtonIconVariants } from './button-icon.css';

export type ButtonIconProps<TUse extends ButtonTypes> =
  PolymorphicComponentProps<TUse> & ButtonIconVariants;

export function ButtonIcon<TUse extends ButtonTypes>(
  props: ButtonIconProps<TUse>,
) {
  const { use: Comp = 'button', className, variant, size, ...rest } = props;

  return (
    <Comp
      className={clsx(buttonIcon({ variant, size }), className)}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      {...(rest as any)}
    />
  );
}
