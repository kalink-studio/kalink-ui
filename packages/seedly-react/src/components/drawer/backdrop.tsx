import {
  DrawerPreview as Drawer,
  type DrawerBackdropProps,
} from '@base-ui/react/drawer';
import { backdrop as backdropClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '@/utils/merge-class-name';

export function Backdrop({ className, ...props }: DrawerBackdropProps) {
  return (
    <Drawer.Backdrop
      {...props}
      className={mergeClassName(backdropClassName, className)}
    />
  );
}
