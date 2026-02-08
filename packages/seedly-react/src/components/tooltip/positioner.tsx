import { Tooltip, type TooltipPositionerProps } from '@base-ui/react/tooltip';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/tooltip';

import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({ className, ...props }: TooltipPositionerProps) {
  return (
    <Tooltip.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
