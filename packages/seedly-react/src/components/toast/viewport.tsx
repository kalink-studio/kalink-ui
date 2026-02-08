import { Toast, type ToastViewportProps } from '@base-ui/react/toast';
import { viewport as viewportClassName } from '@kalink-ui/seedly/components/toast';

import { mergeClassName } from '@/utils/merge-class-name';

export function Viewport({ className, ...props }: ToastViewportProps) {
  return (
    <Toast.Viewport
      {...props}
      className={mergeClassName(viewportClassName, className)}
    />
  );
}
