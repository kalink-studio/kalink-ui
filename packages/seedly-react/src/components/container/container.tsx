import { useRender } from '@base-ui/react/use-render';
import {
  containerResponsive,
  type ContainerVariants,
} from '@kalink-ui/seedly/components/container';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type ContainerProps = useRender.ComponentProps<'div'> &
  Omit<ContainerVariants, 'spacing'> & {
    spacing?: Responsive<NonNullable<ContainerVariants['spacing']>>;
  };

export function Container({
  spacing,
  radius,
  elevation,
  level,
  variant,
  className,
  render,
  ...props
}: ContainerProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(
        containerResponsive({ spacing, radius, elevation, level, variant }),
        className,
      ),
    },
  });
}
