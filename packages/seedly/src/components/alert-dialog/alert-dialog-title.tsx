import { Title } from '@radix-ui/react-alert-dialog';
import { ComponentPropsWithRef } from 'react';

import { Heading, HeadingProps } from '../heading';

export type AlertDialogTitleProps = ComponentPropsWithRef<typeof Title> &
  Omit<HeadingProps, 'variant'> & {
    variant?: HeadingProps['variant'];
  };

export function AlertDialogTitle({
  children,
  variant = 'headline',
  size = 'small',
  ...props
}: AlertDialogTitleProps) {
  return (
    <Title asChild>
      <Heading use="h2" variant={variant} size={size} {...props}>
        {children}
      </Heading>
    </Title>
  );
}
