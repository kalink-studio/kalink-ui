import { useRender } from '@base-ui/react/use-render';
import {
  ellipse,
  loaderRecipe,
  moon,
  moonLoaderResponsive,
  type LoaderVariants,
  type MoonLoaderVariants,
} from '@kalink-ui/seedly/components/loader';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type MoonLoaderProps = Omit<
  useRender.ComponentProps<'div'>,
  'children'
> &
  LoaderVariants &
  Omit<MoonLoaderVariants, 'size'> & {
    forceMount?: boolean;
    size?: Responsive<NonNullable<MoonLoaderVariants['size']>>;
  };

/**
 * Heavily inspired by https://github.com/davidhu2000/react-spinners/blob/main/src/MoonLoader.tsx
 */
export function MoonLoader({
  active,
  size = 'md',
  forceMount = false,
  tone,
  className,
  render,
  ...props
}: MoonLoaderProps) {
  const loader = useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: moonLoaderResponsive(
        { size, tone },
        loaderRecipe({ active }),
        className,
      ),
      children: (
        <>
          <span className={ellipse} />
          <span className={moon} />
        </>
      ),
    },
  });

  if (!active && !forceMount) {
    return null;
  }

  return loader;
}
