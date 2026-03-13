import { Select, type SelectListProps } from '@base-ui/react/select';
import { list as listClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '../../utils/merge-class-name';

export function List({ className, ...props }: SelectListProps) {
  return (
    <Select.List
      {...props}
      className={mergeClassName(listClassName, className)}
    />
  );
}
