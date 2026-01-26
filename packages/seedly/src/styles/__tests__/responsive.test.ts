import { describe, expect, it, vi } from 'vitest';

import {
  resolveResponsive,
  responsiveRecipe,
  defaultOrder,
} from '../responsive';

describe('resolveResponsive', () => {
  const order = ['xs', 'sm', 'md', 'lg'] as const;

  it('returns empty object for null/undefined', () => {
    expect(resolveResponsive(undefined, order)).toEqual({});
    expect(resolveResponsive(null as unknown as undefined, order)).toEqual({});
  });

  it('wraps primitive value as { xs: value }', () => {
    expect(resolveResponsive('red', order)).toEqual({ xs: 'red' });
    expect(resolveResponsive(16, order)).toEqual({ xs: 16 });
  });

  it('passes through object input', () => {
    const input = { xs: 'small', md: 'large' };
    expect(resolveResponsive(input, order)).toEqual(input);
  });

  it('converts array input to breakpoint object', () => {
    const input = ['small', 'medium', 'large'];
    expect(resolveResponsive(input, order)).toEqual({
      xs: 'small',
      sm: 'medium',
      md: 'large',
    });
  });

  it('skips null/undefined values in array input', () => {
    const input = ['small', null, 'large', undefined];
    expect(resolveResponsive(input, order)).toEqual({
      xs: 'small',
      md: 'large',
    });
  });

  it('handles array longer than order', () => {
    const input = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(resolveResponsive(input, order)).toEqual({
      xs: 'a',
      sm: 'b',
      md: 'c',
      lg: 'd',
    });
  });

  it('handles empty array', () => {
    expect(resolveResponsive([], order)).toEqual({});
  });
});

describe('responsiveRecipe', () => {
  it('applies base recipe with xs value', () => {
    const mockRecipe = vi.fn().mockReturnValue('base-class');

    const responsive = responsiveRecipe({
      recipe: mockRecipe,
      at: {},
      order: defaultOrder,
    });

    const result = responsive({ size: 'sm' });

    expect(mockRecipe).toHaveBeenCalledWith({ size: 'sm' });
    expect(result).toContain('base-class');
  });

  it('applies responsive overrides at breakpoints', () => {
    const mockRecipe = vi.fn().mockReturnValue('base-class');

    const at = {
      size: {
        sm: { small: 'size-sm-small', large: 'size-sm-large' },
        md: { small: 'size-md-small', large: 'size-md-large' },
      },
    };

    const responsive = responsiveRecipe({
      recipe: mockRecipe,
      at,
      order: ['xs', 'sm', 'md'] as const,
    });

    const result = responsive({
      size: { xs: 'small', sm: 'large', md: 'small' },
    });

    expect(mockRecipe).toHaveBeenCalledWith({ size: 'small' });
    expect(result).toContain('base-class');
    expect(result).toContain('size-sm-large');
    expect(result).toContain('size-md-small');
  });

  it('passes through className', () => {
    const mockRecipe = vi.fn().mockReturnValue('base-class');

    const responsive = responsiveRecipe({
      recipe: mockRecipe,
      at: {},
      order: defaultOrder,
    });

    const result = responsive({ size: 'sm' }, 'custom-class');

    expect(result).toContain('base-class');
    expect(result).toContain('custom-class');
  });

  it('skips xs breakpoint in overrides', () => {
    const mockRecipe = vi.fn().mockReturnValue('base-class');

    const at = {
      size: {
        sm: { small: 'size-sm-small' },
      },
    };

    const responsive = responsiveRecipe({
      recipe: mockRecipe,
      at,
      order: ['xs', 'sm'] as const,
    });

    // Only xs value, no sm override should be applied
    const result = responsive({ size: { xs: 'small' } });

    expect(result).toBe('base-class');
    expect(result).not.toContain('size-sm-small');
  });

  it('handles missing variant in at map', () => {
    const mockRecipe = vi.fn().mockReturnValue('base-class');

    const responsive = responsiveRecipe({
      recipe: mockRecipe,
      at: {}, // No variants defined
      order: defaultOrder,
    });

    const result = responsive({ size: { xs: 'small', sm: 'large' } });

    expect(result).toBe('base-class');
  });

  it('handles missing breakpoint value in at map', () => {
    const mockRecipe = vi.fn().mockReturnValue('base-class');

    const at = {
      size: {
        sm: { small: 'size-sm-small' }, // 'large' not defined
      },
    };

    const responsive = responsiveRecipe({
      recipe: mockRecipe,
      at,
      order: ['xs', 'sm'] as const,
    });

    const result = responsive({ size: { xs: 'small', sm: 'large' } });

    // Should not include undefined class
    expect(result).toBe('base-class');
  });
});

// Note: createResponsiveVariants cannot be unit tested directly because it uses
// vanilla-extract's styleVariants which requires a .css.ts file context.
// It is tested indirectly through Storybook component tests that use responsive recipes.
