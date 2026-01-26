'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import {
  MenuSeparatorVariants,
  menuSeparatorRecipe,
} from '../menu/menu-separator.css';

export type CommandSeparatorProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Separator
> &
  Omit<MenuSeparatorVariants, 'spacing'>;

export function CommandSeparator({
  className,
  offset = true,
  ...props
}: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator {...props} asChild>
      <div
        className={clsx(menuSeparatorRecipe({ offset }), className)}
        role="presentation"
      />
    </CommandPrimitive.Separator>
  );
}
