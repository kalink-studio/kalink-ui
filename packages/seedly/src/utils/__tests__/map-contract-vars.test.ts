import { describe, expect, test } from 'vitest';

import { mapContractVars } from '../map-contract-vars';

describe('mapContractVars', () => {
  test('should map contract vars', () => {
    const contract = {
      foo: 'foo',
      bar: 'bar',
    };

    const result = mapContractVars(contract, (key) => ({
      padding: `var(--${key})`,
      vars: {
        [`--${key}`]: contract[key],
      },
    }));

    expect(result).toEqual({
      foo: {
        padding: 'var(--foo)',
        vars: {
          '--foo': 'foo',
        },
      },
      bar: {
        padding: 'var(--bar)',
        vars: {
          '--bar': 'bar',
        },
      },
    });
  });
});
