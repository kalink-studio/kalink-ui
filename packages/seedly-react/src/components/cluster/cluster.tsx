import { useRender } from '@base-ui/react/use-render';
import {
  clusterResponsive,
  type ClusterVariants,
} from '@kalink-ui/seedly/components/cluster';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type ClusterProps = useRender.ComponentProps<'div'> &
  Omit<ClusterVariants, 'spacing' | 'justify' | 'align' | 'direction'> & {
    spacing?: Responsive<NonNullable<ClusterVariants['spacing']>>;
    justify?: Responsive<NonNullable<ClusterVariants['justify']>>;
    align?: Responsive<NonNullable<ClusterVariants['align']>>;
    direction?: Responsive<NonNullable<ClusterVariants['direction']>>;
  };

export function Cluster({
  spacing,
  justify,
  align,
  direction,
  className,
  render,
  ...props
}: ClusterProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(
        clusterResponsive({ spacing, align, justify, direction }),
        className,
      ),
    },
  });
}
