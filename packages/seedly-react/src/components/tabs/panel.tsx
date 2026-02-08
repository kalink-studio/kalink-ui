import { Tabs, type TabsPanelProps } from '@base-ui/react/tabs';
import { panel as panelClassName } from '@kalink-ui/seedly/components/tabs';

import { mergeClassName } from '@/utils/merge-class-name';

export function Panel({ className, ...props }: TabsPanelProps) {
  return (
    <Tabs.Panel
      {...props}
      className={mergeClassName(panelClassName, className)}
    />
  );
}
