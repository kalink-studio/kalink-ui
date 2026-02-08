import { Menu } from '@base-ui/react/menu';
import { separator as separatorClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '@/utils/merge-class-name';

import type { SeparatorProps } from '@base-ui/react/separator';

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <Menu.Separator
      {...props}
      className={mergeClassName(separatorClassName, className)}
    />
  );
}
