import { Tabs, type TabsIndicatorProps } from '@base-ui/react/tabs';
import { indicator as indicatorClassName } from '@kalink-ui/seedly/components/tabs';

import { mergeClassName } from '@/utils/merge-class-name';

export function Indicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <Tabs.Indicator
      {...props}
      className={mergeClassName(indicatorClassName, className)}
    />
  );
}
