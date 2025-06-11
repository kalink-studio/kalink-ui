import { clsx } from 'clsx';
import { Children, ElementType } from 'react';

import { Box, BoxProps } from '../box';

import { skeleton, SkeletonVariants } from './skeleton.css';

export type SkeletonProps<TUse extends ElementType> = Omit<
  SkeletonVariants,
  'withChildren'
> &
  BoxProps<TUse>;

export const Skeleton = <TUse extends ElementType>({
  children,
  className,
  type = 'text',
  radius = 'small',
  ...props
}: SkeletonProps<TUse>) => {
  const withChildren = Children.count(children) > 0;

  return (
    <Box
      className={clsx(skeleton({ withChildren, type }), className)}
      radius={radius}
      {...props}
    >
      {children}
    </Box>
  );
};
