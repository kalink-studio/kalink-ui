import {
  ScrollArea,
  type ScrollAreaViewportProps,
} from '@base-ui/react/scroll-area';
import { viewport as viewportClassName } from '@kalink-ui/seedly/components/scroll-area';

import { mergeClassName } from '@/utils/merge-class-name';

export function Viewport({ className, ...props }: ScrollAreaViewportProps) {
  return (
    <ScrollArea.Viewport
      {...props}
      className={mergeClassName(viewportClassName, className)}
    />
  );
}
