import {
  ToggleGroup as BaseToggleGroup,
  type ToggleGroupProps,
} from '@base-ui/react/toggle-group';
import { panel as panelClassName } from '@kalink-ui/seedly/components/toggle-group';

import { mergeClassName } from '../../utils/merge-class-name';
import { SolidShell } from '../_internal/solid-shell';

export function ToggleGroup({
  className,
  render,
  ...props
}: ToggleGroupProps<string>) {
  return (
    <BaseToggleGroup
      {...props}
      render={render ?? <SolidShell />}
      className={mergeClassName(panelClassName, className)}
    />
  );
}
