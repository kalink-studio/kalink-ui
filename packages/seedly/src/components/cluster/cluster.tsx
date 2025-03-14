import { PolymorphicComponentProps } from '@kalink-ui/dibbly/types';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { clusterRecipe, ClusterVariants } from './cluster.css';

type ClusterProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The spacing between items
     */
    spacing?: ClusterVariants['spacing'];

    /**
     * The alignment of items along the main axis
     */
    justify?: ClusterVariants['justify'];

    /**
     * The alignment of items along the cross axis
     */
    align?: ClusterVariants['align'];
  };

/**
 * A custom element for grouping items, with control over the margin between them
 *
 * https://every-layout.dev/layouts/cluster
 */
export const Cluster = <TUse extends ElementType>({
  spacing,
  justify,
  align,
  className,
  ...props
}: ClusterProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(clusterRecipe({ spacing, align, justify }), className)}
      {...rest}
    />
  );
};
