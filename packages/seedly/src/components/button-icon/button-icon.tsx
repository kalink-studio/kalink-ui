import { PolymorphicComponentProps } from '@kalink-ui/dibbly';

import { AccessibleIcon } from '../accessible-icon';
import { ButtonTypes } from '../button/button';

import { ButtonIconVariants } from './button-icon.css';
import { buttonIconResponsive } from './button-icon.responsive';

import type { Responsive } from '../../styles/responsive';

export interface ButtonIconVariantResponsive {
  size?: Responsive<NonNullable<ButtonIconVariants['size']>>;
  variant?: Responsive<NonNullable<ButtonIconVariants['variant']>>;
  tone?: Responsive<NonNullable<ButtonIconVariants['tone']>>;
}

export type ButtonIconProps<TUse extends ButtonTypes> =
  PolymorphicComponentProps<TUse> &
    ButtonIconVariantResponsive & {
      label: string;
    };

export function ButtonIcon<TUse extends ButtonTypes>(
  props: ButtonIconProps<TUse>,
) {
  const {
    use: Comp = 'button',
    className,
    variant,
    size,
    tone,
    children,
    label,
    ...rest
  } = props;

  return (
    <Comp
      className={buttonIconResponsive({ variant, size, tone }, className)}
      {...(rest as Record<string, unknown>)}
    >
      <AccessibleIcon label={label}>{children}</AccessibleIcon>
    </Comp>
  );
}
