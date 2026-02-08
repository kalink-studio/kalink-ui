import { Tabs, type TabsListProps } from '@base-ui/react/tabs';
import { list as listClassName } from '@kalink-ui/seedly/components/tabs';

import { mergeClassName } from '@/utils/merge-class-name';

export function List({ className, ...props }: TabsListProps) {
  return (
    <Tabs.List
      {...props}
      className={mergeClassName(listClassName, className)}
    />
  );
}
