import {
  ScrollArea,
  type ScrollAreaContentProps,
} from '@base-ui/react/scroll-area';
import { content as contentClassName } from '@kalink-ui/seedly/components/scroll-area';

import { mergeClassName } from '@/utils/merge-class-name';

export function Content({ className, ...props }: ScrollAreaContentProps) {
  return (
    <ScrollArea.Content
      {...props}
      className={mergeClassName(contentClassName, className)}
    />
  );
}
