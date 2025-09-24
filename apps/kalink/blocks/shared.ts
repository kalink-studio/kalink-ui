import type { Field } from 'payload';

export const tintOptions = [
  'primary',
  'secondary',
  'primaryContainer',
  'secondaryContainer',
] as const;

export const backgroundTintField = {
  name: 'backgroundTint',
  type: 'select',
  defaultValue: 'primary',
  options: [
    { label: 'Primary', value: 'primary' },
    { label: 'Primary Container', value: 'primaryContainer' },
    { label: 'Secondary Container', value: 'secondaryContainer' },
  ],
  label: 'Background tint',
} satisfies Field;

export const anchorFields = [
  {
    name: 'showInSubNavigation',
    type: 'checkbox',
    defaultValue: true,
    label: 'Show in sub navigation',
  },
  {
    name: 'subNavigationLabel',
    type: 'text',
    admin: {
      condition: (
        _value: unknown,
        siblingData: { showInSubNavigation?: boolean },
      ) => Boolean(siblingData.showInSubNavigation),
    },
    label: 'Sub navigation label',
  },
  {
    name: 'anchorSlug',
    type: 'text',
    admin: {
      condition: (
        _value: unknown,
        siblingData: { showInSubNavigation?: boolean },
      ) => Boolean(siblingData.showInSubNavigation),
      description:
        'Optional custom anchor slug. When empty the slug will be derived from the label or title.',
    },
    label: 'Anchor slug',
  },
] satisfies Field[];
