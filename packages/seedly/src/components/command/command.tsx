'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import { Stack, StackProps } from '../stack';

export type CommandProps = ComponentPropsWithRef<typeof CommandPrimitive> & {
  spacing?: StackProps<'div'>['spacing'];
};

export function Command({
  className,
  children,
  spacing = 2,
  ...props
}: CommandProps) {
  return (
    <CommandPrimitive className={clsx(className)} {...props}>
      <Stack spacing={spacing} align="stretch">
        {children}
      </Stack>
    </CommandPrimitive>
  );
}
