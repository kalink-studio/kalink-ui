'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import { commandGroup } from './command-group.css';

export function CommandGroup({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={clsx(commandGroup, className)}
      {...props}
    />
  );
}
