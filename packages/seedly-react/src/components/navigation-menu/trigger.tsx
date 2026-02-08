import {
  NavigationMenu,
  type NavigationMenuTriggerProps,
} from '@base-ui/react/navigation-menu';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: NavigationMenuTriggerProps) {
  return (
    <NavigationMenu.Trigger
      {...props}
      className={mergeClassName(triggerClassName, className)}
    />
  );
}
