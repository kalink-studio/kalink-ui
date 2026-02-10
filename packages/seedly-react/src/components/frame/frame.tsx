import { useRender } from '@base-ui/react/use-render';
import {
  frameResponsive,
  type FrameVariants,
} from '@kalink-ui/seedly/components/frame';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type FrameProps = useRender.ComponentProps<'div'> &
  Omit<FrameVariants, 'ratio'> & {
    ratio?: Responsive<NonNullable<FrameVariants['ratio']>>;
  };

export function Frame({ ratio, className, render, ...props }: FrameProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(frameResponsive({ ratio }), className),
    },
  });
}
