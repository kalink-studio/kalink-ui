/* eslint-disable import/namespace */
import * as CommonArgDefs from './common';

export enum CommonArgs {
  COMPOSABLE = 'composable',
  POLYMORPHIC = 'polymorphic',
  STYLABLE = 'stylable',
  REFERABLE = 'referable',
}

export function commonArgs(args: CommonArgs[]) {
  const argTypes: Partial<Record<string, object>> = {};
  const knownArgs = Object.values(CommonArgs);

  for (const arg of args) {
    if (!knownArgs.includes(arg)) {
      continue;
    }

    for (const argDef in CommonArgDefs[arg]) {
      argTypes[argDef] = (CommonArgDefs[arg] as Record<string, object>)[argDef];
    }
  }

  return argTypes;
}
