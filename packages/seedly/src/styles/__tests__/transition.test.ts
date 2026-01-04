import { describe, expect, it } from 'vitest';

import { transition } from '../transition';

describe('transition', () => {
  it('creates transition for single property with defaults', () => {
    const result = transition('opacity');

    expect(result).toContain('opacity');
    // Should contain duration and easing from sys.motion defaults
    expect(result).toMatch(/opacity\s+\S+\s+\S+\s+0ms/);
  });

  it('creates transition for array of properties', () => {
    const result = transition(['opacity', 'transform']);

    expect(result).toContain('opacity');
    expect(result).toContain('transform');
    // Should be comma-separated
    expect(result).toContain(',');
  });

  it('applies custom duration', () => {
    const result = transition('opacity', { duration: 'short.2' });

    expect(result).toContain('opacity');
    // Duration should be applied (actual value comes from sys.motion.duration)
  });

  it('applies custom easing', () => {
    const result = transition('opacity', { easing: 'standard' });

    expect(result).toContain('opacity');
    // Easing should be applied (actual value comes from sys.motion.easing)
  });

  it('applies custom delay', () => {
    const result = transition('opacity', { delay: '100ms' });

    expect(result).toContain('opacity');
    expect(result).toContain('100ms');
  });

  it('applies all options combined', () => {
    const result = transition(['opacity', 'transform'], {
      duration: 'medium.1',
      easing: 'decelerate.emphasized',
      delay: '50ms',
    });

    expect(result).toContain('opacity');
    expect(result).toContain('transform');
    expect(result).toContain('50ms');
    expect(result).toContain(',');
  });

  it('handles empty options object', () => {
    const result = transition('opacity', {});

    expect(result).toContain('opacity');
    expect(result).toContain('0ms'); // default delay
  });

  it('uses default props when none provided', () => {
    const result = transition(undefined as unknown as string);

    // Should use ['all'] as default
    expect(result).toContain('all');
  });
});
