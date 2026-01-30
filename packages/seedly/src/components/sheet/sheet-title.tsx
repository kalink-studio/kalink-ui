'use client';

import { Title } from '@radix-ui/react-dialog';
import { ComponentPropsWithRef } from 'react';

import { Heading, HeadingProps, HeadingTypes } from '../heading';
import { TextProps } from '../text';

export type SheetTitleProps<TUse extends HeadingTypes> = ComponentPropsWithRef<
  typeof Title
> &
  HeadingProps<TUse>;

export function SheetTitle<TUse extends HeadingTypes>(
  props: SheetTitleProps<TUse>,
) {
  const {
    use = 'h2',
    className,
    children,
    variant,
    size,
    align,
    subtitle,
    pretitle,
    rootClassName,
    ...rest
  } = props;

  return (
    <Title asChild {...rest}>
      <Heading
        use={use as TextProps<TUse>['use']}
        variant={variant}
        size={size}
        className={className}
        align={align}
        pretitle={pretitle}
        subtitle={subtitle}
        rootClassName={rootClassName}
      >
        {children}
      </Heading>
    </Title>
  );
}
