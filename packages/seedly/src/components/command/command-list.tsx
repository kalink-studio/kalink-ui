'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import { StackProps } from '../stack';

import { commandListResponsive } from './command-list.responsive';

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
      className={commandListResponsive({ spacing }, className)}
      asChild
      {...props}
    />
  );
}
