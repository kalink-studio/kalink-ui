import { assignVars, type StyleRule } from '@vanilla-extract/css';

import { components } from './layers.css';

type VarContract = Record<string, `var(--${string})`>;
type ContractTokenValues<TContract extends VarContract> = Parameters<
  typeof assignVars<TContract>
>[1];

function mapTokensToContract<TContract extends VarContract>(
  contractKeys: (keyof TContract)[],
  value: string,
): ContractTokenValues<TContract> {
  return Object.fromEntries(
    contractKeys.map((contractKey) => [contractKey, value]),
  ) as ContractTokenValues<TContract>;
}

export const mapContractVars = <
  TScale extends Record<string, string>,
  TContract extends VarContract,
>(
  scale: TScale,
  vars: TContract,
) => {
  const scaleKeys = Object.keys(scale) as (keyof TScale)[];
  const contractKeys = Object.keys(vars) as (keyof TContract)[];
  const mappedScaleStyles = {} as Record<keyof TScale, StyleRule>;

  for (const scaleKey of scaleKeys) {
    const value = scale[scaleKey];

    if (value == null) {
      continue;
    }

    const mappedVars = mapTokensToContract(contractKeys, value);

    mappedScaleStyles[scaleKey] = {
      '@layer': {
        [components]: {
          vars: assignVars(vars, mappedVars),
        },
      },
    };
  }

  return mappedScaleStyles;
};
