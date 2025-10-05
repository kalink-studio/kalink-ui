import {
  baseEslintConfig,
  nextEslintConfig,
  reactEslintConfig,
} from '@kalink-ui/eslint-config';

import type { Linter } from 'eslint';


const kalinkEslintConfig: Linter.FlatConfig[] = [
  ...baseEslintConfig,
  ...reactEslintConfig,
  ...nextEslintConfig,
];

kalinkEslintConfig.push({
  ignores: ['app/(payload)/**', 'next-env.d.ts', 'payload-types.ts'],
});

export default kalinkEslintConfig;
