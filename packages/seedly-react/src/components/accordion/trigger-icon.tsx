import { useRender } from '@base-ui/react/use-render';
import { triggerIcon as triggerIconClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '@/utils/merge-class-name';

export type TriggerIconProps = useRender.ComponentProps<'svg'>;

export function TriggerIcon({ className, render, ...props }: TriggerIconProps) {
  return useRender({
    render,
    defaultTagName: 'svg',
    props: {
      ...props,
      className: mergeClassName(triggerIconClassName, className),
    },
  });
}
