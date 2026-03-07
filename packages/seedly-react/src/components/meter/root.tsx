import { Meter, type MeterRootProps } from '@base-ui/react/meter';
import { meter as meterClassName } from '@kalink-ui/seedly/components/meter';

import { mergeClassName } from '../../utils/merge-class-name';

export function Root({ className, ...props }: MeterRootProps) {
  return (
    <Meter.Root
      {...props}
      className={mergeClassName(meterClassName, className)}
    />
  );
}
