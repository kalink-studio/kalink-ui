import { Dialog, type DialogBackdropProps } from '@base-ui/react/dialog';
import { backdrop as backdropClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export function Backdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <Dialog.Backdrop
      {...props}
      className={mergeClassName(backdropClassName, className)}
    />
  );
}
