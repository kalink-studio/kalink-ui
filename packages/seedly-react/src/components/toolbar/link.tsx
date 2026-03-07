import { Toolbar, type ToolbarLinkProps } from '@base-ui/react/toolbar';
import { link as linkClassName } from '@kalink-ui/seedly/components/toolbar';

import { mergeClassName } from '../../utils/merge-class-name';

export function Link({ className, ...props }: ToolbarLinkProps) {
  return (
    <Toolbar.Link
      {...props}
      className={mergeClassName(linkClassName, className)}
    />
  );
}
