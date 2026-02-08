import {
  ContextMenu,
  type ContextMenuPopupProps,
} from '@base-ui/react/context-menu';
import { popup as popupClassName } from '@kalink-ui/seedly/components/context-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: ContextMenuPopupProps) {
  return (
    <ContextMenu.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
