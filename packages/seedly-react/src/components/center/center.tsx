import { useRender } from '@base-ui/react/use-render';
import {
  centerResponsive,
  type CenterVariants,
} from '@kalink-ui/seedly/components/center';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type CenterProps = useRender.ComponentProps<'div'> &
  Omit<CenterVariants, 'gutters' | 'andText' | 'intrinsic'> & {
    andText?: Responsive<NonNullable<CenterVariants['andText']>>;
    gutters?: NonNullable<CenterVariants['gutters']>;
    intrinsic?: Responsive<NonNullable<CenterVariants['intrinsic']>>;
  };

export function Center({
  andText,
  gutters,
  intrinsic,
  className,
  render,
  ...props
}: CenterProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(
        centerResponsive({ andText, gutters, intrinsic }),
        className,
      ),
    },
  });
}
