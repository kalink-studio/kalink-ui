import { Meter, type MeterTrackProps } from '@base-ui/react/meter';
import { track as trackClassName } from '@kalink-ui/seedly/components/meter';

import { mergeClassName } from '../../utils/merge-class-name';

export function Track({ className, ...props }: MeterTrackProps) {
  return (
    <Meter.Track
      {...props}
      className={mergeClassName(trackClassName, className)}
    />
  );
}
