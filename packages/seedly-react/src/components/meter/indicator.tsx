import { Meter, type MeterIndicatorProps } from '@base-ui/react/meter';
import { indicator as indicatorClassName } from '@kalink-ui/seedly/components/meter';

import { mergeClassName } from '@/utils/merge-class-name';

export function Indicator({ className, ...props }: MeterIndicatorProps) {
  return (
    <Meter.Indicator
      {...props}
      className={mergeClassName(indicatorClassName, className)}
    />
  );
}
