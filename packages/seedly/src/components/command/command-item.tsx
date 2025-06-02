'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef, ComponentType } from 'react';

import { Cluster } from '../cluster';
import { menuItem, menuItemIcon } from '../menu/menu-item.css';

export type CommandItemProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Item
> & {
  inset?: boolean;
  icon?: ComponentType<{ className?: string }>;
};

export function CommandItem({
  className,
  inset,
  icon: IconComp,
  children,
  ...props
}: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      className={clsx(menuItem({ inset }), className)}
      {...props}
    >
      <Cluster spacing={2} align="center">
        {IconComp && <IconComp className={menuItemIcon} />}
        {children}
      </Cluster>
    </CommandPrimitive.Item>
  );
}
