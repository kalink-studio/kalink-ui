import { Progress, type ProgressValueProps } from '@base-ui/react/progress';
import { value as valueClassName } from '@kalink-ui/seedly/components/progress';

import { mergeClassName } from '@/utils/merge-class-name';

export function Value({ className, ...props }: ProgressValueProps) {
  return (
    <Progress.Value
      {...props}
      className={mergeClassName(valueClassName, className)}
    />
  );
}
