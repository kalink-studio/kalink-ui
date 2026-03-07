import {
  DrawerPreview as Drawer,
  type DrawerViewportProps,
} from '@base-ui/react/drawer';
import { viewport as viewportClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '../../utils/merge-class-name';

export function Viewport({ className, ...props }: DrawerViewportProps) {
  return (
    <Drawer.Viewport
      {...props}
      className={mergeClassName(viewportClassName, className)}
    />
  );
}
