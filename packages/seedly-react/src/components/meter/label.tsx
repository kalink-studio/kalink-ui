import { Meter, type MeterLabelProps } from '@base-ui/react/meter';
import { labelRecipe } from '@kalink-ui/seedly/components/label';
import { label as labelClassName } from '@kalink-ui/seedly/components/meter';

import { mergeClassName } from '@/utils/merge-class-name';

export function Label({ className, ...props }: MeterLabelProps) {
  return (
    <Meter.Label
      {...props}
      className={mergeClassName(
        labelRecipe({ variant: 'field' }),
        labelClassName,
        className,
      )}
    />
  );
}
