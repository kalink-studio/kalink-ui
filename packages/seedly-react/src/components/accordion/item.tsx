import { Accordion, type AccordionItemProps } from '@base-ui/react/accordion';
import { item as itemClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '@/utils/merge-class-name';

export function Item({ className, ...props }: AccordionItemProps) {
  return (
    <Accordion.Item
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
