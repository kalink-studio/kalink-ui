import { Tabs, type TabsRootProps } from '@base-ui/react/tabs';
import { tabs as tabsClassName } from '@kalink-ui/seedly/components/tabs';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: TabsRootProps) {
  return (
    <Tabs.Root
      {...props}
      className={mergeClassName(tabsClassName, className)}
    />
  );
}
