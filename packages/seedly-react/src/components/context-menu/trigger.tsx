import {
  ContextMenu,
  type ContextMenuTriggerProps,
} from '@base-ui/react/context-menu';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/context-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <ContextMenu.Trigger
      {...props}
      className={mergeClassName(triggerClassName, className)}
    />
  );
}
