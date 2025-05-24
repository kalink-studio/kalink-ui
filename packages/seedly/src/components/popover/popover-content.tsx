'use client';

import { Portal, Content } from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';

import { Box, BoxProps } from '../box';
import { ScrollArea } from '../scroll-area';

import { popoverContent, PopoverContentVariants } from './popover-content.css';

export type PopoverContentProps = {
  portaled?: boolean;
  maxHeight?: string;
  scrollable?: boolean;
} & ComponentPropsWithRef<typeof Content> &
  PopoverContentVariants &
  ComponentPropsWithoutRef<typeof Portal> &
  BoxProps<'div'>;

export interface PopoverScrollableProps {
  scrollable?: boolean;
  maxHeight?: string;
  children?: ReactNode;
}

export function PopoverScrollable({
  children,
  scrollable = true,
  maxHeight,
}: PopoverScrollableProps) {
  if (scrollable === false) {
    return children;
  }

  return <ScrollArea maxHeight={maxHeight}>{children}</ScrollArea>;
}

export function PopoverContent({
  className,
  align = 'center',
  container,
  children,
  spacing = 4,
  radius = 'medium',
  width,
  portaled = true,
  scrollable = true,
  maxHeight = 'var(--radix-popover-content-available-height)',
  ...props
}: PopoverContentProps) {
  const content = (
    <Content
      align={align}
      className={clsx(popoverContent({ width, scrollable }), className)}
      sideOffset={0}
      asChild
      collisionPadding={16}
      {...props}
    >
      <Box spacing={spacing} radius={radius}>
        <PopoverScrollable scrollable={scrollable} maxHeight={maxHeight}>
          {children}
        </PopoverScrollable>
      </Box>
    </Content>
  );

  return portaled === true ? (
    <Portal container={container}>{content}</Portal>
  ) : (
    content
  );
}
