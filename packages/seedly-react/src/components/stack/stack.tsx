import { useRender } from '@base-ui/react/use-render';
import {
  stackResponsive,
  type StackVariants,
} from '@kalink-ui/seedly/components/stack';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type StackProps = useRender.ComponentProps<'div'> &
  Omit<StackVariants, 'spacing' | 'align'> & {
    spacing?: Responsive<NonNullable<StackVariants['spacing']>>;
    align?: Responsive<NonNullable<StackVariants['align']>>;
  };

export function Stack({
  spacing,
  align,
  className,
  render,
  ...props
}: StackProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(stackResponsive({ spacing, align }), className),
    },
  });
}
