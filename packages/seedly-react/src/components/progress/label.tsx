import { Progress, type ProgressLabelProps } from '@base-ui/react/progress';
import { label as labelClassName } from '@kalink-ui/seedly/components/progress';

import { mergeClassName } from '@/utils/merge-class-name';

export function Label({ className, ...props }: ProgressLabelProps) {
  return (
    <Progress.Label
      {...props}
      className={mergeClassName(labelClassName, className)}
    />
  );
}
