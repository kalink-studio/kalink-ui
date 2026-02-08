import { Progress, type ProgressRootProps } from '@base-ui/react/progress';
import { progress as progressClassName } from '@kalink-ui/seedly/components/progress';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: ProgressRootProps) {
  return (
    <Progress.Root
      {...props}
      className={mergeClassName(progressClassName, className)}
    />
  );
}
