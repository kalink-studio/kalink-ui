import { Get as GetType, UnknownRecord } from 'type-fest';

import { type PathsOf } from '../types/paths-of';

import { toPathSegments } from './to-path-segments';

export type GetProp<
  Source,
  Path extends string,
  DefaultValue = undefined,
> = Source extends UnknownRecord | unknown[]
  ? unknown extends GetType<Source, Path>
    ? DefaultValue extends undefined
      ? unknown
      : DefaultValue
    : null extends GetType<Source, Path>
      ? GetType<Source, Path>
      : NonNullable<GetType<Source, Path>>
  : DefaultValue;

export function getProp<
  Source extends UnknownRecord | unknown[],
  Path extends PathsOf<Source>,
  DefaultValue = undefined,
>(
  obj: Source,
  path: Path,
  defaultValue?: DefaultValue,
): GetProp<Source, Path, DefaultValue> {
  if (Object(obj) !== obj || typeof path !== 'string') {
    return defaultValue as GetProp<Source, Path, DefaultValue>;
  }

  const keyPath = toPathSegments(path);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let pointer: any = obj;

  for (let i = 0; i <= keyPath.length - 1; i++) {
    const key = keyPath[i] as keyof typeof pointer;

    if (pointer[key] === undefined) {
      return defaultValue as GetProp<Source, Path, DefaultValue>;
    }

    pointer = pointer[key];

    if (pointer === null) {
      break;
    }
  }

  return (pointer === undefined ? defaultValue : pointer) as GetProp<
    Source,
    Path,
    DefaultValue
  >;
}
