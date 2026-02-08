import { Select, type SelectValueProps } from '@base-ui/react/select';
import { value as valueClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '@/utils/merge-class-name';

export function Value({ className, ...props }: SelectValueProps) {
  return (
    <Select.Value
      {...props}
      className={mergeClassName(valueClassName, className)}
    />
  );
}
