import {
  NavigationMenu,
  type NavigationMenuContentProps,
} from '@base-ui/react/navigation-menu';
import { content as contentClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function Content({ className, ...props }: NavigationMenuContentProps) {
  return (
    <NavigationMenu.Content
      {...props}
      className={mergeClassName(contentClassName, className)}
    />
  );
}
