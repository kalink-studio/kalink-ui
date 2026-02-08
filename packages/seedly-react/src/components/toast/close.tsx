import { Toast, type ToastCloseProps } from '@base-ui/react/toast';
import { close as closeClassName } from '@kalink-ui/seedly/components/toast';

import { mergeClassName } from '@/utils/merge-class-name';

export function Close({ className, ...props }: ToastCloseProps) {
  return (
    <Toast.Close
      {...props}
      className={mergeClassName(closeClassName, className)}
    />
  );
}
