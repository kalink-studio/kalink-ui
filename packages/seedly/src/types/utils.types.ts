import type { ComponentPropsWithRef, ElementType } from 'react';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

export type UnwrapArray<R> = R extends unknown[] ? UnwrapArray<R[number]> : R;

export type PolymorphicComponentProps<TUse extends ElementType> = {
  use?: TUse;
} & DistributiveOmit<
  ComponentPropsWithRef<ElementType extends TUse ? 'div' : TUse>,
  'use'
>;
