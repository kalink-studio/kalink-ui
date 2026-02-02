import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { SurfaceVariants } from './surface.css';
import { surfaceResponsive } from './surface.responsive';

import type { Responsive } from '../../styles/responsive';

export type SurfaceProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<SurfaceVariants, 'spacing'> & {
      spacing?: Responsive<NonNullable<SurfaceVariants['spacing']>>;
    };

export function Surface<TUse extends ElementType = 'div'>({
  spacing,
  radius,
  elevation,
  level,
  variant,
  className,
  ...props
}: SurfaceProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={surfaceResponsive(
        { spacing, radius, elevation, level, variant },
        className,
      )}
      {...rest}
    />
  );
}
