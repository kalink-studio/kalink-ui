import { useRender } from '@base-ui/react/use-render';
import { content as contentClassName } from '@kalink-ui/seedly/components/collapsible';

import { mergeClassName } from '@/utils/merge-class-name';

export type ContentProps = useRender.ComponentProps<'div'>;

export function Content({ className, render, ...props }: ContentProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(contentClassName, className),
    },
  });
}
