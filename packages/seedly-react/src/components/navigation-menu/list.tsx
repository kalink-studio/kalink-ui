import {
  NavigationMenu,
  type NavigationMenuListProps,
} from '@base-ui/react/navigation-menu';
import { list as listClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Ref } from 'react';

type ListProps = Omit<NavigationMenuListProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
};

export function List({ className, ...props }: ListProps) {
  return (
    <NavigationMenu.List
      {...props}
      className={mergeClassName(listClassName, className)}
    />
  );
}
