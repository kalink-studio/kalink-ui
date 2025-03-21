import { ComponentPropsWithRef, ElementType } from 'react';

import { DistributiveOmit } from './distributive-omit';

export type PolymorphicComponentProps<TUse extends ElementType> = {
  /**
   * The component used to render the element.
   */
  use?: TUse;
} & DistributiveOmit<
  ComponentPropsWithRef<ElementType extends TUse ? 'div' : TUse>,
  'use'
>;
