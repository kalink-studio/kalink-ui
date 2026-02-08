import {
  ToggleGroup as BaseToggleGroup,
  type ToggleGroupProps,
} from '@base-ui/react/toggle-group';
import { panel as panelClassName } from '@kalink-ui/seedly/components/toggle-group';

import { mergeClassName } from '@/utils/merge-class-name';

export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      {...props}
      className={mergeClassName(panelClassName, className)}
    />
  );
}
