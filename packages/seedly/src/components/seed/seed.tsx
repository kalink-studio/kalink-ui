import { type PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { type ElementType } from 'react';

import {
  extractSprinklesProps,
  type GetSprinkles,
  type SprinklesFnBase,
} from '../../styles';

/**
 * When you use `SeedProps` in other components and want to define a default
 * value for that prop in your component (e.g. `const { use = 'span' } = props;`)
 * you will need to cast the `use` prop as `YourComponentProps<TUse>['use]` otherwise
 * it will be considered as `TUse | span` and you will get a type error.
 */
export type SeedProps<
  TUse extends ElementType,
  TSprinklesFn extends SprinklesFnBase,
> = PolymorphicComponentProps<TUse> & GetSprinkles<TSprinklesFn>;

export interface CreateSeedParams<SprinklesFn> {
  sprinkles: SprinklesFn;
  defaultClassName?: string;
}

export function plantSeed<SprinklesFn extends SprinklesFnBase>({
  sprinkles,
  defaultClassName,
}: CreateSeedParams<SprinklesFn>) {
  const Seed = <TUse extends ElementType = 'div'>(
    props: SeedProps<TUse, SprinklesFn>,
  ) => {
    const { use: Comp = 'div', className, ...rest } = props;

    const [sprinklesProps, componentProps] = extractSprinklesProps(
      rest,
      sprinkles,
    );

    return (
      <Comp
        className={clsx(sprinkles(sprinklesProps), defaultClassName, className)}
        {...componentProps}
      />
    );
  };

  return Seed;
}

/**
 * A higher-order component that injects sprinkles and default className.
 */
export function withSeed<SprinklesFn extends SprinklesFnBase>({
  sprinkles,
  defaultClassName,
}: CreateSeedParams<SprinklesFn>) {
  return function wrapWithSprinkles<TProps, TUse extends ElementType>(
    WrappedComponent: ElementType<PolymorphicComponentProps<TUse> & TProps>,
  ) {
    const ComponentWithSeed = (
      props: SeedProps<TUse, SprinklesFn> & TProps,
    ) => {
      const { className, ...rest } = props;

      const [sprinklesProps, componentProps] = extractSprinklesProps(
        rest,
        sprinkles,
      );

      return (
        // @ts-expect-error - TODO: fix this
        <WrappedComponent
          className={clsx(
            sprinkles(sprinklesProps),
            defaultClassName,
            className,
          )}
          {...componentProps}
        />
      );
    };

    return ComponentWithSeed;
  };
}
