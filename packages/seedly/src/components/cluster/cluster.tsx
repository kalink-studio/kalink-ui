import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { ClusterVariants } from './cluster.css';
import { clusterResponsive } from './cluster.responsive';

import type { Responsive } from '../../styles/responsive';

export type ClusterProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<ClusterVariants, 'spacing' | 'justify' | 'align'> & {
      spacing?: Responsive<NonNullable<ClusterVariants['spacing']>>;
      justify?: Responsive<NonNullable<ClusterVariants['justify']>>;
      align?: Responsive<NonNullable<ClusterVariants['align']>>;
    };

/**
 * A custom element for grouping items, with control over the margin between them
 *
 * https://every-layout.dev/layouts/cluster
 */
export function Cluster<TUse extends ElementType>({
  spacing,
  justify,
  align,
  className,
  ...props
}: ClusterProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(
        clusterResponsive({ spacing, align, justify }),
        className,
      )}
      {...rest}
    />
  );
}
