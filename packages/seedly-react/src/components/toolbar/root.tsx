import { Toolbar, type ToolbarRootProps } from '@base-ui/react/toolbar';
import { toolbar as toolbarClassName } from '@kalink-ui/seedly/components/toolbar';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: ToolbarRootProps) {
  return (
    <Toolbar.Root
      {...props}
      className={mergeClassName(toolbarClassName, className)}
    />
  );
}
