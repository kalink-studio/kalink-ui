'use client';

import { Title } from '@radix-ui/react-dialog';
import { ComponentPropsWithRef } from 'react';

import { Heading, HeadingProps, HeadingTypes } from '../heading';

type SheetTitleProps<TUse extends HeadingTypes> = ComponentPropsWithRef<
  typeof Title
> &
  HeadingProps<TUse>;

export function SheetTitle<TUse extends HeadingTypes>(
  props: SheetTitleProps<TUse>,
) {
  const { use = 'h2', className, children, variant, size, ...rest } = props;

  return (
    <Title asChild>
      <Heading
        use={use as HeadingProps<TUse>['use']}
        variant={variant}
        size={size}
        className={className}
        {...rest}
      >
        {children}
      </Heading>
    </Title>
  );
}
