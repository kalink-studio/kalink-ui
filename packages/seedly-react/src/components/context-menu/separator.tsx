import { ContextMenu } from '@base-ui/react/context-menu';
import { separator as separatorClassName } from '@kalink-ui/seedly/components/context-menu';

import { mergeClassName } from '@/utils/merge-class-name';

import type { SeparatorProps } from '@base-ui/react/separator';

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <ContextMenu.Separator
      {...props}
      className={mergeClassName(separatorClassName, className)}
    />
  );
}
