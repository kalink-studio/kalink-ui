import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { ClusterVariants } from './cluster.css';
import { clusterResponsive } from './cluster.responsive';

import type { Responsive } from '../../styles/responsive';

export type ClusterProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<ClusterVariants, 'spacing' | 'justify' | 'align' | 'direction'> & {
      spacing?: Responsive<NonNullable<ClusterVariants['spacing']>>;
      justify?: Responsive<NonNullable<ClusterVariants['justify']>>;
      align?: Responsive<NonNullable<ClusterVariants['align']>>;
      direction?: Responsive<NonNullable<ClusterVariants['direction']>>;
    };

/**
 * A custom element for grouping items, with control over the margin between them
 *
 * https://every-layout.dev/layouts/cluster
 */
export function Cluster<TUse extends ElementType = 'div'>({
  spacing,
  justify,
  align,
  direction,
  className,
  ...props
}: ClusterProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clusterResponsive(
        { spacing, align, justify, direction },
        className,
      )}
      {...rest}
    />
  );
}
