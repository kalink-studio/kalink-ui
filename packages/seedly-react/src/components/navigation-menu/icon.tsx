import {
  NavigationMenu,
  type NavigationMenuIconProps,
} from '@base-ui/react/navigation-menu';
import { icon as iconClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';

import type { Ref } from 'react';

type IconProps = Omit<NavigationMenuIconProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
};

export function Icon({ className, ...props }: IconProps) {
  return (
    <NavigationMenu.Icon
      {...props}
      className={mergeClassName(iconClassName, className)}
    />
  );
}
