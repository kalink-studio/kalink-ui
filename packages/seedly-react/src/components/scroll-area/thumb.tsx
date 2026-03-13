import {
  ScrollArea,
  type ScrollAreaThumbProps,
} from '@base-ui/react/scroll-area';
import { thumb as thumbClassName } from '@kalink-ui/seedly/components/scroll-area';

import { mergeClassName } from '../../utils/merge-class-name';

export function Thumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <ScrollArea.Thumb
      {...props}
      className={mergeClassName(thumbClassName, className)}
    />
  );
}
