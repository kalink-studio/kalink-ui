import { describe, expect, it, vi } from 'vitest';

import { createSlugFields } from './create-slug-fields';

describe('createSlugFields', () => {
  it('builds slug and override fields with merged admin config', () => {
    const extraHook = vi.fn();
    const { overrideField, slugField } = createSlugFields({
      description: 'Generated from title',
      label: 'Permalink',
      name: 'permalink',
      overrideDescription: 'Manual edits enabled',
      slugField: {
        admin: {
          className: 'custom-class',
        },
        hooks: {
          beforeValidate: [extraHook],
        },
        required: false,
      },
      sourceFieldPath: 'seo.title',
    });

    expect(slugField.name).toBe('permalink');
    expect(slugField.label).toBe('Permalink');
    expect(slugField.required).toBe(false);
    expect(slugField.admin?.components?.Field).toMatchObject({
      path: '@kalink-ui/canopy/client#SlugField',
    });
    expect(slugField.admin?.custom).toMatchObject({
      slug: {
        overrideDescription: 'Manual edits enabled',
        overrideFieldPath: 'permalinkManualOverride',
        overrideLabel: 'Edit slug manually',
        sourceFieldPath: 'seo.title',
      },
    });
    expect(slugField.hooks?.beforeValidate).toHaveLength(2);
    expect(slugField.hooks?.beforeValidate?.[1]).toBe(extraHook);

    expect(overrideField.name).toBe('permalinkManualOverride');
    expect(overrideField.type).toBe('checkbox');
    expect(overrideField.admin).toMatchObject({
      disableListColumn: true,
      hidden: true,
    });
  });

  it('slugifies from the source field when manual override is disabled', () => {
    const { slugField } = createSlugFields({
      name: 'slug',
      sourceFieldPath: 'seo.title',
    });
    const hook = slugField.hooks?.beforeValidate?.[0];

    if (!hook) {
      throw new Error('Slug beforeValidate hook is missing.');
    }

    const result = hook({
      data: {
        seo: {
          title: 'Hello World',
        },
        slugManualOverride: false,
      },
      originalDoc: {},
      siblingData: {},
      value: undefined,
    } as never);

    expect(result).toBe('hello-world');
  });

  it('slugifies the manual value when override is enabled', () => {
    const customSlugify = vi.fn((input: unknown) => `custom:${String(input)}`);
    const { slugField } = createSlugFields({
      name: 'slug',
      slugify: customSlugify,
    });
    const hook = slugField.hooks?.beforeValidate?.[0];

    if (!hook) {
      throw new Error('Slug beforeValidate hook is missing.');
    }

    const result = hook({
      data: {
        slug: 'Manual Value',
        slugManualOverride: true,
        title: 'Ignored Title',
      },
      originalDoc: {},
      siblingData: {},
      value: 'Manual Value',
    } as never);

    expect(customSlugify).toHaveBeenCalledWith('Manual Value');
    expect(result).toBe('custom:Manual Value');
  });
});
