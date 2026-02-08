import { Tabs, type TabsTabProps } from '@base-ui/react/tabs';
import { tab as tabClassName } from '@kalink-ui/seedly/components/tabs';

import { mergeClassName } from '@/utils/merge-class-name';

export function Tab({ className, ...props }: TabsTabProps) {
  return (
    <Tabs.Tab {...props} className={mergeClassName(tabClassName, className)} />
  );
}
