import { clsx } from 'clsx';
import { Children, ElementType } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';
import { Box, BoxProps } from '../box';

import { skeleton, SkeletonVariants } from './skeleton.css';

export type SkeletonProps<TUse extends ElementType> = Omit<
  SkeletonVariants,
  'withChildren' | 'size'
> &
  BoxProps<TUse> & {
    size?: Responsive<NonNullable<SkeletonVariants['size']>>;
  };

export const Skeleton = <TUse extends ElementType>({
  children,
  className,
  type = 'text',
  radius = 'small',
  size,
  ...props
}: SkeletonProps<TUse>) => {
  const withChildren = Children.count(children) > 0;
  const baseSize = getResponsiveBase(size) ?? 'md';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides =
    type === 'text'
      ? buildTypographyOverrides({ variant: 'body', size: typographySize })
      : undefined;

  return (
    <Box
      className={clsx(
        skeleton({ withChildren, type, size: baseSize }),
        typographyOverrides,
        className,
      )}
      radius={radius}
      {...props}
    >
      {children}
    </Box>
  );
};
