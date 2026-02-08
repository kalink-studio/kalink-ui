import { Meter, type MeterValueProps } from '@base-ui/react/meter';
import { value as valueClassName } from '@kalink-ui/seedly/components/meter';

import { mergeClassName } from '@/utils/merge-class-name';

export function Value({ className, ...props }: MeterValueProps) {
  return (
    <Meter.Value
      {...props}
      className={mergeClassName(valueClassName, className)}
    />
  );
}
