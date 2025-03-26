import js from '@eslint/js';
import { Linter } from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-expect-error Declaration file is not available for the package
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import {
  configs as tseslintConfigs,
  config as tseslintConfig,
} from 'typescript-eslint';

export const baseEslintConfig = tseslintConfig(
  js.configs.recommended,
  tseslintConfigs.recommended,
  tseslintConfigs.stylistic,
  eslintConfigPrettier,
  {
    extends: [importConfigs.recommended, importConfigs.typescript],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'parent',
            },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/named': 'error',
      'import/first': 'error',
      'import/no-unresolved': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    ignores: ['**/dist/**', '**/build/**'],
  },
) as Linter.Config[];
