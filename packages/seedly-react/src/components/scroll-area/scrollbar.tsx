import {
  ScrollArea,
  type ScrollAreaScrollbarProps,
} from '@base-ui/react/scroll-area';
import { scrollbar as scrollbarClassName } from '@kalink-ui/seedly/components/scroll-area';

import { mergeClassName } from '../../utils/merge-class-name';

export function Scrollbar({ className, ...props }: ScrollAreaScrollbarProps) {
  return (
    <ScrollArea.Scrollbar
      {...props}
      className={mergeClassName(scrollbarClassName, className)}
    />
  );
}
