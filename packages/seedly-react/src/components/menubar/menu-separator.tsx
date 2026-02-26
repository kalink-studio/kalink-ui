import { menuSeparator as menuSeparatorClassName } from '@kalink-ui/seedly/components/menubar';

import { Menu } from '../menu';
import { mergeClassName } from '@/utils/merge-class-name';

import type { SeparatorProps } from '@base-ui/react/separator';

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <Menu.Separator
      {...props}
      className={mergeClassName(menuSeparatorClassName, className)}
    />
  );
}
