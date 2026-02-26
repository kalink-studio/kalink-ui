import { useRender } from '@base-ui/react/use-render';
import { itemText as itemTextClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export type ItemTextProps = useRender.ComponentProps<'div'>;

export function ItemText({ className, render, ...props }: ItemTextProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(itemTextClassName, className),
    },
  });
}
