import { Toolbar, type ToolbarButtonProps } from '@base-ui/react/toolbar';
import { button as buttonClassName } from '@kalink-ui/seedly/components/toolbar';

import { mergeClassName } from '@/utils/merge-class-name';

export function Button({ className, ...props }: ToolbarButtonProps) {
  return (
    <Toolbar.Button
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
