import { describe, expect, it } from 'vitest';

import { isObject } from '../is-object';

describe('isObject', () => {
  it('should return true if value is an object', () => {
    expect(isObject({})).toEqual(true);
  });

  it('should return false if value is an array', () => {
    expect(isObject([])).toEqual(false);
  });

  it('should return false if value is null or undefined', () => {
    expect(isObject(null)).toEqual(false);
    expect(isObject(undefined)).toEqual(false);
  });

  it('should return false if value is any scalar', () => {
    expect(isObject(1)).toEqual(false);
    expect(isObject('foo')).toEqual(false);
    expect(isObject(true)).toEqual(false);
  });
});
