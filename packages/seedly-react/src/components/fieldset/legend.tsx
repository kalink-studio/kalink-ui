import { Fieldset, type FieldsetLegendProps } from '@base-ui/react/fieldset';
import { legend as legendClassName } from '@kalink-ui/seedly/components/fieldset';

import { mergeClassName } from '@/utils/merge-class-name';

export function Legend({ className, ...props }: FieldsetLegendProps) {
  return (
    <Fieldset.Legend
      {...props}
      className={mergeClassName(legendClassName, className)}
    />
  );
}
