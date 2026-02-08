import { Dialog, type DialogTriggerProps } from '@base-ui/react/dialog';
import { button as buttonClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: DialogTriggerProps) {
  return (
    <Dialog.Trigger
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
