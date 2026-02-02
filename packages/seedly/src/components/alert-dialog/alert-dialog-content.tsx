import { AlertDialogPortal, Content } from '@radix-ui/react-alert-dialog';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { Container, ContainerProps } from '../container';
import { ScrollArea, ScrollAreaProps } from '../scroll-area';

import { alertDialogContentRecipe } from './alert-dialog-content.css';
import { AlertDialogOverlay } from './alert-dialog-overlay';

export type AlertDialogContentVariants = NonNullable<
  RecipeVariants<typeof alertDialogContentRecipe>
>;

type ContainerStyleProps = Pick<
  ContainerProps<'div'>,
  'spacing' | 'radius' | 'elevation' | 'use'
>;

export type AlertDialogContentProps = AlertDialogContentVariants &
  Pick<ScrollAreaProps, 'maxHeight'> &
  ComponentPropsWithoutRef<typeof AlertDialogPortal> &
  ContainerStyleProps & {
    tone?: ScrollAreaProps['tone'];
  } & Omit<ComponentPropsWithoutRef<typeof Content>, keyof ContainerStyleProps>;

export function AlertDialogContent({
  className,
  children,
  container,
  forceMount,
  variant,
  maxHeight = '50vh',
  elevation = 'high',
  radius,
  spacing = 2,
  use,
  tone,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal container={container} forceMount={forceMount}>
      <AlertDialogOverlay tone={tone} />
      <Content
        className={clsx(alertDialogContentRecipe({ variant }), className)}
        asChild
        {...props}
      >
        <Container
          use={use}
          variant="solid"
          spacing={spacing}
          elevation={elevation}
          radius={radius}
        >
          <ScrollArea maxHeight={maxHeight} tone={tone}>
            {children}
          </ScrollArea>
        </Container>
      </Content>
    </AlertDialogPortal>
  );
}
