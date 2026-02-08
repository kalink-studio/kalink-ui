import { Accordion, type AccordionHeaderProps } from '@base-ui/react/accordion';
import { header as headerClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '@/utils/merge-class-name';

export function Header({ className, ...props }: AccordionHeaderProps) {
  return (
    <Accordion.Header
      {...props}
      className={mergeClassName(headerClassName, className)}
    />
  );
}
