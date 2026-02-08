import {
  Collapsible,
  type CollapsibleRootProps,
} from '@base-ui/react/collapsible';
import { collapsible as collapsibleClassName } from '@kalink-ui/seedly/components/collapsible';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: CollapsibleRootProps) {
  return (
    <Collapsible.Root
      {...props}
      className={mergeClassName(collapsibleClassName, className)}
    />
  );
}
