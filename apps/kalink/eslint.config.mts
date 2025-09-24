import {
  baseEslintConfig,
  reactEslintConfig,
  nextEslintConfig,
} from '@kalink-ui/eslint-config';

const config = [...baseEslintConfig, ...reactEslintConfig, ...nextEslintConfig];

config.push({
  ignores: ['app/(payload)/**', 'next-env.d.ts', 'payload-types.ts'],
});

export default config;
