import { clsx } from 'clsx';
import { ElementType } from 'react';

import { PolymorphicComponentProps } from '@/types/utils.types';

import { frameRecipe, FrameVariants } from './frame.css';

type FrameProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> & {
  /**
   * The ratio of the frame
   */
  ratio?: FrameVariants['ratio'];
};

/**
 * A custom element for augmenting image ratios
 *
 * https://every-layout.dev/layouts/frame
 */
export const Frame = <TUse extends ElementType>({
  ratio,
  className,
  ...props
}: FrameProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return <Comp className={clsx(frameRecipe({ ratio }), className)} {...rest} />;
};
