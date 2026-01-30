import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { FrameVariants } from './frame.css';
import { frameResponsive } from './frame.responsive';

import type { Responsive } from '../../styles/responsive';

type FrameProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> &
  Omit<FrameVariants, 'ratio'> & {
    ratio?: Responsive<NonNullable<FrameVariants['ratio']>>;
  };

/**
 * A custom element for augmenting image ratios
 *
 * https://every-layout.dev/layouts/frame
 */
export function Frame<TUse extends ElementType = 'div'>(
  props: FrameProps<TUse>,
) {
  const { use: Comp = 'div', className, ratio, ...rest } = props;

  return <Comp className={frameResponsive({ ratio }, className)} {...rest} />;
}
