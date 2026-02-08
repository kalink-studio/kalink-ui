import { Select, type SelectTriggerProps } from '@base-ui/react/select';
import { select as selectClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: SelectTriggerProps) {
  return (
    <Select.Trigger
      {...props}
      className={mergeClassName(selectClassName, className)}
    />
  );
}
