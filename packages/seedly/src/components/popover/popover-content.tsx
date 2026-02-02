'use client';

import { Portal, Content } from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';

import { Container, ContainerProps } from '../container';
import { ScrollArea } from '../scroll-area';

import {
  popoverContentRecipe,
  PopoverContentVariants,
} from './popover-content.css';

import type { Tone } from '../../styles';

type ContainerStyleProps = Pick<
  ContainerProps<'div'>,
  'variant' | 'spacing' | 'radius' | 'elevation' | 'use'
>;

export type PopoverContentProps = {
  portaled?: boolean;
  maxHeight?: string;
  scrollable?: boolean;
  tone?: Tone;
} & PopoverContentVariants &
  ComponentPropsWithoutRef<typeof Portal> &
  ContainerStyleProps &
  Omit<ComponentPropsWithRef<typeof Content>, keyof ContainerStyleProps>;

export interface PopoverScrollableProps {
  scrollable?: boolean;
  maxHeight?: string;
  children?: ReactNode;
  tone?: Tone;
}

export function PopoverScrollable({
  children,
  scrollable = true,
  maxHeight,
  tone,
}: PopoverScrollableProps) {
  if (scrollable === false) {
    return children;
  }

  return (
    <ScrollArea maxHeight={maxHeight} tone={tone}>
      {children}
    </ScrollArea>
  );
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
  tone,
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
      <Container
        use={use}
        variant={variant}
        spacing={spacing}
        radius={radius}
        elevation={elevation}
      >
        <PopoverScrollable
          scrollable={scrollable}
          maxHeight={maxHeight}
          tone={tone}
        >
          {children}
        </PopoverScrollable>
      </Container>
    </Content>
  );

  return portaled === true ? (
    <Portal container={container}>{content}</Portal>
  ) : (
    content
  );
}
