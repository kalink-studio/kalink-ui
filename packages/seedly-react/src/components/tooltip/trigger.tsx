import { Tooltip, type TooltipTriggerProps } from '@base-ui/react/tooltip';
import { button as buttonClassName } from '@kalink-ui/seedly/components/tooltip';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <Tooltip.Trigger
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
