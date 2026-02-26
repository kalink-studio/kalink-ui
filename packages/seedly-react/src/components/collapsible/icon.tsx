import { useRender } from '@base-ui/react/use-render';
import { icon as iconClassName } from '@kalink-ui/seedly/components/collapsible';

import { mergeClassName } from '@/utils/merge-class-name';

export type IconProps = useRender.ComponentProps<'svg'>;

export function Icon({ className, render, ...props }: IconProps) {
  return useRender({
    render,
    defaultTagName: 'svg',
    props: {
      ...props,
      className: mergeClassName(iconClassName, className),
    },
  });
}
