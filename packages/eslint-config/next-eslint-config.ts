import pluginNext from '@next/eslint-plugin-next';

import { baseEslintConfig } from './base-eslint-config';
import { reactEslintConfig } from './react-eslint-config';

export const nextEslintConfig = [
  ...baseEslintConfig,
  ...reactEslintConfig,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
];
