import { describe, expect, it } from 'vitest';

import { getProp } from '../get-prop';

describe('get', () => {
  it('should get a value in an object', () => {
    const obj = {
      foo: 'bar',
    };

    const result = getProp(obj, 'foo');

    expect(result).toEqual('bar');
  });

  it('should get a value in an array', () => {
    const arr = ['foo', 'bar'];

    const result = getProp(arr, '1');

    expect(result).toEqual('bar');
  });

  it('should get a nested value in an object', () => {
    const obj = {
      foo: {
        bar: 'baz',
      },
    };

    const result = getProp(obj, 'foo.bar');

    expect(result).toEqual('baz');
  });

  it('should get a nested value in an array', () => {
    const obj = {
      foo: ['bar', 'baz'],
    };

    const result = getProp(obj, 'foo.1');

    expect(result).toEqual('baz');
  });

  it('should get a deeply nested value', () => {
    const obj = {
      foo: {
        bar: [
          {
            foo: 'bar',
            baz: {
              foo: ['bar', 'foobar'],
            },
          },
          {
            foo: 'bar',
            baz: {
              foo: ['bar', 'baz'],
            },
          },
        ],
      },
    };

    const result = getProp(obj, 'foo.bar.0.baz.foo.1');

    expect(result).toEqual('foobar');
  });

  it('should support bracket notation for arrays', () => {
    const obj = {
      foo: {
        bar: [
          {
            foo: 'bar',
            baz: {
              foo: ['bar', 'foobar'],
            },
          },
          {
            foo: 'bar',
            baz: {
              foo: ['bar', 'baz'],
            },
          },
        ],
      },
    };

    const result = getProp(obj, 'foo.bar[0].baz.foo[1]');

    expect(result).toEqual('foobar');
  });

  it('should return the default value if the path does not exist', () => {
    const obj = {
      foo: 'foo',
    };

    // @ts-expect-error - test requires an invalid path
    const result = getProp(obj, 'foo.bar', 'qux');

    expect(result).toEqual('qux');
  });

  it('should return the default value if the path does not exist in an array', () => {
    const arr = ['foo', 'bar'];

    const result = getProp(arr, '2', 'qux');

    expect(result).toEqual('qux');
  });

  it('should return the default value if the path does not exist in a nested object', () => {
    const obj = {
      foo: {
        bar: 'bar',
      },
    };

    // @ts-expect-error - test requires an invalid path
    const result = getProp(obj, 'foo.baz', 'qux');

    expect(result).toEqual('qux');
  });

  it('should return the default value if the path does not exist in a nested array', () => {
    const obj = {
      foo: ['bar', 'baz'],
    };

    const result = getProp(obj, 'foo.2', 'qux');

    expect(result).toEqual('qux');
  });

  it('should correctly handle null values', () => {
    const obj = {
      foo: null,
    };

    expect(getProp(obj, 'foo', 'qux')).toEqual(null);
    // @ts-expect-error - test requires an invalid path
    expect(getProp(obj, 'foo.bar', 'qux')).toEqual(null);
  });
});
