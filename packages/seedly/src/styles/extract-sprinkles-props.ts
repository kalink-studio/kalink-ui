import { UnknownRecord } from 'type-fest';

export interface SprinklesFnBase<TSprinklesProps = Record<string, unknown>> {
  (props: TSprinklesProps): string;
  properties: Set<Extract<keyof TSprinklesProps, string>>;
}

export type GetSprinkles<T extends SprinklesFnBase> =
  T extends SprinklesFnBase<infer TSprinklesProps> ? TSprinklesProps : never;

export const extractSprinklesProps = <
  TProps extends UnknownRecord,
  TSprinkles extends SprinklesFnBase,
>(
  props: TProps,
  sprinkles: TSprinkles,
): [
  Pick<TProps, Extract<keyof TProps, keyof GetSprinkles<TSprinkles>>>,
  Omit<TProps, Extract<keyof TProps, keyof GetSprinkles<TSprinkles>>>,
] => {
  const sprinkleProps = {} as Pick<
    TProps,
    Extract<keyof TProps, keyof GetSprinkles<TSprinkles>>
  >;
  const componentProps = {} as Omit<
    TProps,
    Extract<keyof TProps, keyof GetSprinkles<TSprinkles>>
  >;

  for (const key of Object.keys(props) as (keyof TProps)[]) {
    if (sprinkles.properties.has(key as string)) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (sprinkleProps as any)[key] = props[key];
    } else {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (componentProps as any)[key] = props[key];
    }
  }

  return [sprinkleProps, componentProps];
};
