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

import {
  popoverContentRecipe,
  PopoverContentVariants,
} from './popover-content.css';

type BoxStyleProps = Pick<
  BoxProps<'div'>,
  'variant' | 'spacing' | 'radius' | 'elevation' | 'use'
>;

export type PopoverContentProps = {
  portaled?: boolean;
  maxHeight?: string;
  scrollable?: boolean;
} & PopoverContentVariants &
  ComponentPropsWithoutRef<typeof Portal> &
  BoxStyleProps &
  Omit<ComponentPropsWithRef<typeof Content>, keyof BoxStyleProps>;

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
  variant,
  use,
  width,
  portaled = true,
  scrollable = true,
  maxHeight = 'var(--radix-popover-content-available-height)',
  elevation,
  ...props
}: PopoverContentProps) {
  const content = (
    <Content
      align={align}
      className={clsx(
        popoverContentRecipe({ width, scrollable, elevation }),
        className,
      )}
      sideOffset={0}
      asChild
      collisionPadding={16}
      {...props}
    >
      <Box
        use={use}
        variant={variant}
        spacing={spacing}
        radius={radius}
        elevation={elevation}
      >
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
