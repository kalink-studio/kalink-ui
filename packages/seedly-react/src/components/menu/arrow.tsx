import { Menu, type MenuArrowProps } from '@base-ui/react/menu';
import { arrow as arrowClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({ className, ...props }: MenuArrowProps) {
  return (
    <Menu.Arrow
      {...props}
      className={mergeClassName(arrowClassName, className)}
    />
  );
}
