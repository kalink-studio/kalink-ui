import { Description } from '@radix-ui/react-alert-dialog';
import { ComponentPropsWithRef } from 'react';

import { Heading, HeadingSubtitleProps } from '../heading';

export type AlertDialogDescriptionProps = ComponentPropsWithRef<
  typeof Description
> &
  HeadingSubtitleProps;

export function AlertDialogDescription({
  children,
  variant = 'body',
  size = 'medium',
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <Description asChild {...props}>
      <Heading.Subtitle variant={variant} size={size}>
        {children}
      </Heading.Subtitle>
    </Description>
  );
}
