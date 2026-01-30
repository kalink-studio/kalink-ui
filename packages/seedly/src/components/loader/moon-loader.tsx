import { ElementType } from 'react';

import { Box, BoxProps } from '../box';

import {
  ellipse,
  moon,
  loaderRecipe,
  LoaderVariants,
  MoonLoaderVariants,
} from './loader.css';
import { moonLoaderResponsive } from './moon-loader.responsive';

import type { Responsive } from '../../styles/responsive';

export type LoaderProps<TUse extends ElementType> = BoxProps<TUse> & {
  forceMount?: boolean;
  className?: string;
} & LoaderVariants;

/**
 * Heavily inspired by https://github.com/davidhu2000/react-spinners/blob/main/src/MoonLoader.tsx
 */
export function MoonLoader<TUse extends ElementType>({
  active,
  size = 'md',
  forceMount = false,
  className,
  ...props
}: LoaderProps<TUse> &
  Omit<MoonLoaderVariants, 'size'> & {
    size?: Responsive<NonNullable<MoonLoaderVariants['size']>>;
  }) {
  if (!active && !forceMount) {
    return null;
  }

  return (
    <Box
      className={moonLoaderResponsive(
        { size },
        loaderRecipe({ active }),
        className,
      )}
      {...props}
    >
      <span className={ellipse} />
      <span className={moon} />
    </Box>
  );
}
