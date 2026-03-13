import { Drawer, type DrawerContentProps } from '@base-ui/react/drawer';
import { content as contentClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '../../utils/merge-class-name';

export function Content({ className, ...props }: DrawerContentProps) {
  return (
    <Drawer.Content
      {...props}
      className={mergeClassName(contentClassName, className)}
    />
  );
}
