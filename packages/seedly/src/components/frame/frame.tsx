import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { frameRecipe, FrameVariants } from './frame.css';

type FrameProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> &
  FrameVariants;

/**
 * A custom element for augmenting image ratios
 *
 * https://every-layout.dev/layouts/frame
 */
export function Frame<TUse extends ElementType>({
  ratio,
  className,
  ...props
}: FrameProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return <Comp className={clsx(frameRecipe({ ratio }), className)} {...rest} />;
}
