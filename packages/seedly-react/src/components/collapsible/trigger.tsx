import {
  Collapsible,
  type CollapsibleTriggerProps,
} from '@base-ui/react/collapsible';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/collapsible';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: CollapsibleTriggerProps) {
  return (
    <Collapsible.Trigger
      {...props}
      className={mergeClassName(triggerClassName, className)}
    />
  );
}
