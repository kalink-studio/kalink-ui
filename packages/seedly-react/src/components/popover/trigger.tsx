import { Popover, type PopoverTriggerProps } from '@base-ui/react/popover';
import { iconButton as iconButtonClassName } from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: PopoverTriggerProps) {
  return (
    <Popover.Trigger
      {...props}
      className={mergeClassName(iconButtonClassName, className)}
    />
  );
}
