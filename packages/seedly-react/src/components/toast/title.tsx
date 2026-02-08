import { Toast, type ToastTitleProps } from '@base-ui/react/toast';
import { title as titleClassName } from '@kalink-ui/seedly/components/toast';

import { mergeClassName } from '@/utils/merge-class-name';

export function Title({ className, ...props }: ToastTitleProps) {
  return (
    <Toast.Title
      {...props}
      className={mergeClassName(titleClassName, className)}
    />
  );
}
