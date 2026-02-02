import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { ContainerVariants } from './container.css';
import { containerResponsive } from './container.responsive';

import type { Responsive } from '../../styles/responsive';

export type ContainerProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<ContainerVariants, 'spacing'> & {
      spacing?: Responsive<NonNullable<ContainerVariants['spacing']>>;
    };

export function Container<TUse extends ElementType = 'div'>({
  spacing,
  radius,
  elevation,
  level,
  variant,
  className,
  ...props
}: ContainerProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={containerResponsive(
        { spacing, radius, elevation, level, variant },
        className,
      )}
      {...rest}
    />
  );
}
