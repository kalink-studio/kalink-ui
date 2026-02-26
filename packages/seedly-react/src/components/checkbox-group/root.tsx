import {
  CheckboxGroup as BaseCheckboxGroup,
  type CheckboxGroupProps,
} from '@base-ui/react/checkbox-group';
import { checkboxGroup as checkboxGroupClassName } from '@kalink-ui/seedly/components/checkbox-group';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      {...props}
      className={mergeClassName(checkboxGroupClassName, className)}
    />
  );
}
