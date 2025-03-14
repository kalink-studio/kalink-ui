export type UnwrapArray<R> = R extends unknown[] ? UnwrapArray<R[number]> : R;
