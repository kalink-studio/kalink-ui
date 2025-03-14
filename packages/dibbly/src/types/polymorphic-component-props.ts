import { ComponentPropsWithRef, ElementType } from 'react';

import { DistributiveOmit } from './distributive-omit';

export type PolymorphicComponentProps<TUse extends ElementType> = {
  use?: TUse;
} & DistributiveOmit<
  ComponentPropsWithRef<ElementType extends TUse ? 'div' : TUse>,
  'use'
>;
