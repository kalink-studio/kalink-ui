import { Toolbar, type ToolbarGroupProps } from '@base-ui/react/toolbar';
import { group as groupClassName } from '@kalink-ui/seedly/components/toolbar';

import { mergeClassName } from '../../utils/merge-class-name';

export function Group({ className, ...props }: ToolbarGroupProps) {
  return (
    <Toolbar.Group
      {...props}
      className={mergeClassName(groupClassName, className)}
    />
  );
}
