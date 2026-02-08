import {
  ScrollArea,
  type ScrollAreaRootProps,
} from '@base-ui/react/scroll-area';
import { scrollArea as scrollAreaClassName } from '@kalink-ui/seedly/components/scroll-area';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: ScrollAreaRootProps) {
  return (
    <ScrollArea.Root
      {...props}
      className={mergeClassName(scrollAreaClassName, className)}
    />
  );
}
