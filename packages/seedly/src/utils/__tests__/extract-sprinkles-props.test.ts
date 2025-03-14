import { describe, expect, test, vi } from 'vitest';

import {
  extractSprinklesProps,
  type SprinklesFnBase,
} from '../extract-sprinkles-props';

describe('extractSprinklesProps', () => {
  const mockSprinkles: SprinklesFnBase = {
    properties: new Set(['color', 'fontSize', 'padding']),
  } as SprinklesFnBase;

  test('should correctly separate sprinkles props from component props', () => {
    const props = {
      color: 'red',
      fontSize: '16px',
      padding: '10px',
      onClick: vi.fn(),
      className: 'custom-class',
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual({
      color: 'red',
      fontSize: '16px',
      padding: '10px',
    });

    expect(componentProps).toEqual({
      onClick: expect.any(Function),
      className: 'custom-class',
    });
  });

  test('should handle props with no sprinkles properties', () => {
    const props = {
      onClick: vi.fn(),
      className: 'custom-class',
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual({});
    expect(componentProps).toEqual(props);
  });

  test('should handle props with only sprinkles properties', () => {
    const props = {
      color: 'blue',
      fontSize: '14px',
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual(props);
    expect(componentProps).toEqual({});
  });

  test('should handle empty props object', () => {
    const props = {};

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual({});
    expect(componentProps).toEqual({});
  });

  test('should handle sprinkles function with empty properties set', () => {
    const emptySprinkles: SprinklesFnBase = {
      properties: new Set(),
    } as SprinklesFnBase;

    const props = {
      color: 'green',
      onClick: vi.fn(),
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      emptySprinkles,
    );

    expect(sprinkleProps).toEqual({});
    expect(componentProps).toEqual(props);
  });
});
