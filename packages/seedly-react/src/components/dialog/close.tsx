import { Dialog, type DialogCloseProps } from '@base-ui/react/dialog';
import { button as buttonClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export function Close({ className, ...props }: DialogCloseProps) {
  return (
    <Dialog.Close
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
