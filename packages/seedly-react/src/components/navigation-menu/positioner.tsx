import {
  NavigationMenu,
  type NavigationMenuPositionerProps,
} from '@base-ui/react/navigation-menu';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({
  className,
  ...props
}: NavigationMenuPositionerProps) {
  return (
    <NavigationMenu.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
