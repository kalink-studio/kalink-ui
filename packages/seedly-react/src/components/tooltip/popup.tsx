import { Tooltip, type TooltipPopupProps } from '@base-ui/react/tooltip';
import { popup as popupClassName } from '@kalink-ui/seedly/components/tooltip';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: TooltipPopupProps) {
  return (
    <Tooltip.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
