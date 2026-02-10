import { assignVars } from '@vanilla-extract/css';

import { mapContractVars, sys } from '../../../styles';
import { components } from '../../../styles/layers.css';

type SpacingVarContract = Record<string, string>;

interface CreateSpacingContractStylesOptions<
  TContract extends SpacingVarContract,
> {
  property?: 'gap' | 'columnGap' | 'rowGap';
  mapValue?: (value: string) => Partial<Record<keyof TContract, string>>;
}

export const createSpacingContractStyles = <
  TContract extends SpacingVarContract,
>(
  vars: TContract,
  options: CreateSpacingContractStylesOptions<TContract> = {},
) => {
  const { property, mapValue } = options;
  const contractKeys = Object.keys(vars) as (keyof TContract)[];
  const firstKey = contractKeys[0];

  return mapContractVars(sys.spacing, (key) => {
    const spacingValue = sys.spacing[key];

    const mappedVars = mapValue
      ? mapValue(spacingValue)
      : firstKey == null
        ? {}
        : ({
            [firstKey]: spacingValue,
          } as Partial<Record<keyof TContract, string>>);

    return {
      '@layer': {
        [components]: {
          ...(property && firstKey ? { [property]: vars[firstKey] } : {}),
          vars: assignVars(vars as never, mappedVars as never),
        },
      },
    };
  });
};

export const createSpacingVarStyles = <TContract extends SpacingVarContract>(
  vars: TContract,
  property?: 'gap' | 'columnGap' | 'rowGap',
) => {
  return createSpacingContractStyles(vars, { property });
};
