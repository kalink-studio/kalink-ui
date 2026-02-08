import { Dialog, type DialogPopupProps } from '@base-ui/react/dialog';
import { popup as popupClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: DialogPopupProps) {
  return (
    <Dialog.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
