import { Toolbar, type ToolbarSeparatorProps } from '@base-ui/react/toolbar';
import { separator as separatorClassName } from '@kalink-ui/seedly/components/toolbar';

import { mergeClassName } from '@/utils/merge-class-name';

export function Separator({ className, ...props }: ToolbarSeparatorProps) {
  return (
    <Toolbar.Separator
      {...props}
      className={mergeClassName(separatorClassName, className)}
    />
  );
}
