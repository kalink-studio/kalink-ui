import {
  ContextMenu,
  type ContextMenuTriggerProps,
} from '@base-ui/react/context-menu';

export function Trigger({ className, ...props }: ContextMenuTriggerProps) {
  return <ContextMenu.Trigger {...props} className={className} />;
}
