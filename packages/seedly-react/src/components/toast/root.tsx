import { Toast, type ToastRootProps } from '@base-ui/react/toast';
import { toast as toastClassName } from '@kalink-ui/seedly/components/toast';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: ToastRootProps) {
  return (
    <Toast.Root
      {...props}
      className={mergeClassName(toastClassName, className)}
    />
  );
}
