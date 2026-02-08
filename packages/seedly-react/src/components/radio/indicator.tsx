import { Radio, type RadioIndicatorProps } from '@base-ui/react/radio';
import { indicator as indicatorClassName } from '@kalink-ui/seedly/components/radio';

import { mergeClassName } from '@/utils/merge-class-name';

export function Indicator({ className, ...props }: RadioIndicatorProps) {
  return (
    <Radio.Indicator
      {...props}
      className={mergeClassName(indicatorClassName, className)}
    />
  );
}
