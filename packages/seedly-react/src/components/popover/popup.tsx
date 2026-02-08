import { Popover, type PopoverPopupProps } from '@base-ui/react/popover';
import { popup as popupClassName } from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: PopoverPopupProps) {
  return (
    <Popover.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
