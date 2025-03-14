import { Paths, UnknownRecord } from 'type-fest';

export type DotToBracketPath<Path extends string> =
  Path extends `${infer Key}.${infer Tail}`
    ? `${Tail}` extends `${bigint}` | `${number}`
      ? `${Key}[${Tail}]`
      : Tail extends `${infer TailKey}.${infer Rest}`
        ? `${TailKey}` extends `${bigint}` | `${number}`
          ? `${Key}[${TailKey}].${DotToBracketPath<Rest>}`
          : `${Key}.${DotToBracketPath<Tail>}`
        : `${Key}.${Tail}`
    : Path;

export type PathsOf<Source extends UnknownRecord | unknown[]> = (
  | DotToBracketPath<Paths<Source> & string>
  | Paths<Source>
) &
  string;
