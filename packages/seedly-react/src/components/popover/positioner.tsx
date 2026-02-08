import { Popover, type PopoverPositionerProps } from '@base-ui/react/popover';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({ className, ...props }: PopoverPositionerProps) {
  return (
    <Popover.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
