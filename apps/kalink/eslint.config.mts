import next from '@kalink-ui/eslint-config/next';

export default [
  ...next,
  {
    ignores: ['app/(payload)/**', 'next-env.d.ts', 'payload-types.ts'],
  },
];
