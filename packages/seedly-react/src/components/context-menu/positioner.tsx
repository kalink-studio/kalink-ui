import {
  ContextMenu,
  type ContextMenuPositionerProps,
} from '@base-ui/react/context-menu';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/context-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({
  className,
  ...props
}: ContextMenuPositionerProps) {
  return (
    <ContextMenu.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
