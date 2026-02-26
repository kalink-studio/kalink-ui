import {
  ToggleGroup as BaseToggleGroup,
  type ToggleGroupProps,
} from '@base-ui/react/toggle-group';
import { panel as panelClassName } from '@kalink-ui/seedly/components/toggle-group';

import { SolidShell } from '@/components/_internal/solid-shell';
import { mergeClassName } from '@/utils/merge-class-name';

export function ToggleGroup({ className, render, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      {...props}
      render={render ?? <SolidShell />}
      className={mergeClassName(panelClassName, className)}
    />
  );
}
