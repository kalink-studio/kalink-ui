import { Progress, type ProgressIndicatorProps } from '@base-ui/react/progress';
import { indicator as indicatorClassName } from '@kalink-ui/seedly/components/progress';

import { mergeClassName } from '../../utils/merge-class-name';

export function Indicator({ className, ...props }: ProgressIndicatorProps) {
  return (
    <Progress.Indicator
      {...props}
      className={mergeClassName(indicatorClassName, className)}
    />
  );
}
