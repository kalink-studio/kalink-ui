'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithoutRef } from 'react';

import { menuItem } from '../menu/menu-item.css';

export type CommandEmptyProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

export function CommandEmpty(props: CommandEmptyProps) {
  return <CommandPrimitive.Empty className={menuItem()} {...props} />;
}
