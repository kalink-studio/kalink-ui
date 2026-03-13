import { Toolbar, type ToolbarRootProps } from '@base-ui/react/toolbar';
import { toolbar as toolbarClassName } from '@kalink-ui/seedly/components/toolbar';

import { mergeClassName } from '../../utils/merge-class-name';
import { SolidShell } from '../_internal/solid-shell';

export function Root({ className, render, ...props }: ToolbarRootProps) {
  return (
    <Toolbar.Root
      {...props}
      render={render ?? <SolidShell />}
      className={mergeClassName(toolbarClassName, className)}
    />
  );
}
