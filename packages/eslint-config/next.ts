import pluginNext from '@next/eslint-plugin-next';
import { Linter } from 'eslint';

export const nextEslintConfig = [
  {
    ignores: ['**/*.next/**'],
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
] as Linter.Config[];
