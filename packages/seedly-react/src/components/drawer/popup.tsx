import {
  DrawerPreview as Drawer,
  type DrawerPopupProps,
} from '@base-ui/react/drawer';
import { popup as popupClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: DrawerPopupProps) {
  return (
    <Drawer.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
