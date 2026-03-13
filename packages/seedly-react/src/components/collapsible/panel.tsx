import {
  Collapsible,
  type CollapsiblePanelProps,
} from '@base-ui/react/collapsible';
import { panel as panelClassName } from '@kalink-ui/seedly/components/collapsible';

import { mergeClassName } from '../../utils/merge-class-name';

export function Panel({ className, ...props }: CollapsiblePanelProps) {
  return (
    <Collapsible.Panel
      {...props}
      className={mergeClassName(panelClassName, className)}
    />
  );
}
