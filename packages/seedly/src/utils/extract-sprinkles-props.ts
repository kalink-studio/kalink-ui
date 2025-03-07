import type { SprinklesProperties } from '@vanilla-extract/sprinkles';
import type { UnknownRecord } from 'type-fest';

export interface SprinklesFnBase {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (...args: any): string;
  properties: Set<string>;
}

export type GetSprinkles<T extends SprinklesFnBase> = Parameters<T>[0];

export type SprinklesProps<TSprinklesFnBase extends SprinklesFnBase> =
  TSprinklesFnBase['properties'] extends Set<infer T>
    ? {
        [KeyType in keyof T]: T[KeyType] extends SprinklesProperties
          ? KeyType
          : never;
      }
    : never;

/**
 * Extracts the sprinkles properties from the given component props,
 * returning an array containing the extracted sprinkle props and
 * the remaining component props.
 */
export const extractSprinklesProps = <
  ComponentProps extends UnknownRecord,
  SprinklesFn extends SprinklesFnBase,
>(
  props: ComponentProps,
  sprinkles: SprinklesFn,
) => {
  const sprinkleProps: Record<string, unknown> = {};
  const componentProps: Record<string, unknown> = {};

  for (const prop of Object.keys(props)) {
    if (sprinkles.properties.has(prop)) {
      sprinkleProps[prop] = props[prop];
      continue;
    }

    componentProps[prop] = props[prop];
  }

  return [sprinkleProps, componentProps];
};
