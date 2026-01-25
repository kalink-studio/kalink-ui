'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef, ComponentType } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';
import { Cluster } from '../cluster';
import { menuItem, menuItemIcon, MenuItemTone } from '../menu/menu-item.css';

import type { MenuItemVariants } from '../menu/menu-item.css';

export type CommandItemProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Item
> & {
  inset?: boolean;
  icon?: ComponentType<{ className?: string }>;
  tone?: MenuItemTone;
  size?: Responsive<NonNullable<MenuItemVariants['size']>>;
};

export function CommandItem({
  className,
  inset,
  icon: IconComp,
  children,
  tone,
  size,
  ...props
}: CommandItemProps) {
  const baseSize = getResponsiveBase(size) ?? 'md';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'body',
    size: typographySize,
  });

  return (
    <CommandPrimitive.Item
      className={clsx(
        menuItem({ inset, tone, size: baseSize }),
        typographyOverrides,
        className,
      )}
      {...props}
    >
      <Cluster spacing={2} align="center">
        {IconComp && <IconComp className={menuItemIcon} />}
        {children}
      </Cluster>
    </CommandPrimitive.Item>
  );
}
