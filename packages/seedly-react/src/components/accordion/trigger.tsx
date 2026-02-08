import {
  Accordion,
  type AccordionTriggerProps,
} from '@base-ui/react/accordion';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: AccordionTriggerProps) {
  return (
    <Accordion.Trigger
      {...props}
      className={mergeClassName(triggerClassName, className)}
    />
  );
}
