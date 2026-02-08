import { Checkbox, type CheckboxIndicatorProps } from '@base-ui/react/checkbox';
import { indicator as indicatorClassName } from '@kalink-ui/seedly/components/checkbox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Indicator({ className, ...props }: CheckboxIndicatorProps) {
  return (
    <Checkbox.Indicator
      {...props}
      className={mergeClassName(indicatorClassName, className)}
    />
  );
}
