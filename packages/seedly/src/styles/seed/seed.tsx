import { clsx } from 'clsx';

import type { PolymorphicComponentProps } from '@/types/utils.types';
import {
  extractSprinklesProps,
  type GetSprinkles,
  type SprinklesFnBase,
} from '@/utils/extract-sprinkles-props';

import type { ElementType } from 'react';

/**
 * When you use `SeedProps` in other components and want to define a default
 * value for that prop in your component (e.g. `const { use = 'span' } = props;`)
 * you will need to cast the `use` prop as `YourComponentProps<TUse>['use]` otherwise
 * it will be considered as `TUse | span` and you will get a type error.
 *
 * You can see an example of this in `frontend/components/text/text.tsx`.
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
