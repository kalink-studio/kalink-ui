import { useRender } from '@base-ui/react/use-render';
import { buttonIcon as buttonIconClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '@/utils/merge-class-name';

export type TriggerIconProps = useRender.ComponentProps<'span'>;

export function TriggerIcon({ className, render, ...props }: TriggerIconProps) {
  return useRender({
    render,
    defaultTagName: 'span',
    props: {
      ...props,
      className: mergeClassName(buttonIconClassName, className),
    },
  });
}
