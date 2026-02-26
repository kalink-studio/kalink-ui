import {
  Checkbox as BaseCheckbox,
  type CheckboxRootProps,
} from '@base-ui/react/checkbox';
import { checkbox as checkboxClassName } from '@kalink-ui/seedly/components/checkbox-group';

import { mergeClassName } from '@/utils/merge-class-name';

export function Checkbox({ className, ...props }: CheckboxRootProps) {
  return (
    <BaseCheckbox.Root
      {...props}
      className={mergeClassName(checkboxClassName, className)}
    />
  );
}
