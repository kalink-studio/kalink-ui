'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import { commandList } from './command-list.css';

export function CommandList({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={clsx(commandList, className)}
      {...props}
    />
  );
}
