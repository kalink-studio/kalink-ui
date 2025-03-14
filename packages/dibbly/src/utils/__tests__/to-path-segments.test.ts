import { describe, expect, it } from 'vitest';

import { toPathSegments } from '../to-path-segments';

describe('toPathSegments', () => {
  it('should convert a string to an array of path segments', () => {
    expect(toPathSegments('foo')).toEqual(['foo']);
    expect(toPathSegments('foo.bar')).toEqual(['foo', 'bar']);
    expect(toPathSegments('foo.1.bar')).toEqual(['foo', '1', 'bar']);
    expect(toPathSegments('foo[1].bar')).toEqual(['foo', '1', 'bar']);
  });

  it('should accept an array of path segments', () => {
    const segments = ['foo', 'bar'];
    expect(toPathSegments(segments)).toBe(segments);
  });

  it('should throw an error if the path is not a string or an array', () => {
    // @ts-expect-error - test requires an invalid path
    expect(() => toPathSegments(1)).toThrowError(
      'Path must be a string or an array of path segments',
    );
  });
});
