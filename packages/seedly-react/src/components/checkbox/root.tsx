import { Checkbox, type CheckboxRootProps } from '@base-ui/react/checkbox';
import { checkbox as checkboxClassName } from '@kalink-ui/seedly/components/checkbox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: CheckboxRootProps) {
  return (
    <Checkbox.Root
      {...props}
      className={mergeClassName(checkboxClassName, className)}
    />
  );
}
