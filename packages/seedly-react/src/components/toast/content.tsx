import { Toast, type ToastContentProps } from '@base-ui/react/toast';
import { content as contentClassName } from '@kalink-ui/seedly/components/toast';

import { mergeClassName } from '@/utils/merge-class-name';

export function Content({ className, ...props }: ToastContentProps) {
  return (
    <Toast.Content
      {...props}
      className={mergeClassName(contentClassName, className)}
    />
  );
}
