import { Progress, type ProgressTrackProps } from '@base-ui/react/progress';
import { track as trackClassName } from '@kalink-ui/seedly/components/progress';

import { mergeClassName } from '@/utils/merge-class-name';

export function Track({ className, ...props }: ProgressTrackProps) {
  return (
    <Progress.Track
      {...props}
      className={mergeClassName(trackClassName, className)}
    />
  );
}
