import { Select, type SelectIconProps } from '@base-ui/react/select';
import { selectIcon as selectIconClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '@/utils/merge-class-name';

export function Icon({ className, ...props }: SelectIconProps) {
  return (
    <Select.Icon
      {...props}
      className={mergeClassName(selectIconClassName, className)}
    />
  );
}
