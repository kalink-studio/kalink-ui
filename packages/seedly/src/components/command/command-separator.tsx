'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import {
  MenuSeparatorVariants,
  menuSeparator,
} from '../menu/menu-separator.css';

export type CommandSeparatorProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Separator
> &
  MenuSeparatorVariants;

export function CommandSeparator({
  className,
  spacing = 4,
  offset = true,
  ...props
}: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      className={clsx(menuSeparator({ offset, spacing }), className)}
      {...props}
    />
  );
}
