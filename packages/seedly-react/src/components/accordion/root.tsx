import { Accordion, type AccordionRootProps } from '@base-ui/react/accordion';
import { accordion as accordionClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '../../utils/merge-class-name';

export function Root({ className, ...props }: AccordionRootProps) {
  return (
    <Accordion.Root
      {...props}
      className={mergeClassName(accordionClassName, className)}
    />
  );
}
