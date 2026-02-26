import { useRender } from '@base-ui/react/use-render';
import { actions as actionsClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export type ActionsProps = useRender.ComponentProps<'div'>;

export function Actions({ className, render, ...props }: ActionsProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(actionsClassName, className),
    },
  });
}
