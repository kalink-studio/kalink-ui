'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import { StackProps } from '../stack';

import { commandList } from './command-list.css';

type CommandListProps = ComponentPropsWithRef<typeof CommandPrimitive.List> & {
  spacing?: StackProps<'div'>['spacing'];
};

export function CommandList({
  className,
  spacing = 4,
  ...props
}: CommandListProps) {
  return (
    <CommandPrimitive.List
      className={clsx(commandList({ spacing }), className)}
      asChild
      {...props}
    />
  );
}
