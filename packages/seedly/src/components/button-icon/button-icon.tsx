import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';

import { ButtonTypes } from '../button/button';

import { ButtonIconVariants } from './button-icon.css';
import { buttonIconResponsive } from './button-icon.responsive';

import type { Responsive } from '../../styles/responsive';

type ButtonIconVariantResponsive = {
  [K in keyof ButtonIconVariants]?: Responsive<
    NonNullable<ButtonIconVariants[K]>
  >;
};

export type ButtonIconProps<TUse extends ButtonTypes> =
  PolymorphicComponentProps<TUse> & ButtonIconVariantResponsive;

export function ButtonIcon<TUse extends ButtonTypes>(
  props: ButtonIconProps<TUse>,
) {
  const { use: Comp = 'button', className, variant, size, ...rest } = props;

  return (
    <Comp
      className={clsx(buttonIconResponsive({ variant, size }), className)}
      {...(rest as Record<string, unknown>)}
    />
  );
}
