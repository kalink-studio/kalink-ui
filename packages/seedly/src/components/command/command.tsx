'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import { Stack, StackVariants } from '../stack';

export type CommandProps = ComponentPropsWithRef<typeof CommandPrimitive> & {
  spacing?: StackVariants['spacing'];
};

export function Command({
  className,
  children,
  spacing = 2,
  ...props
}: CommandProps) {
  return (
    <CommandPrimitive className={clsx(className)} {...props}>
      <Stack spacing={spacing}>{children}</Stack>
    </CommandPrimitive>
  );
}
