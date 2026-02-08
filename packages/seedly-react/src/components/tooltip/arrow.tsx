import { Tooltip, type TooltipArrowProps } from '@base-ui/react/tooltip';
import { arrow as arrowClassName } from '@kalink-ui/seedly/components/tooltip';

import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({ className, ...props }: TooltipArrowProps) {
  return (
    <Tooltip.Arrow
      {...props}
      className={mergeClassName(arrowClassName, className)}
    />
  );
}
