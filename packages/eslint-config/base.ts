import js from '@eslint/js';
import { Linter } from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import {
  configs as tseslintConfigs,
  config as tseslintConfig,
} from 'typescript-eslint';

export const baseEslintConfig = tseslintConfig(
  js.configs.recommended,
  tseslintConfigs.recommended,
  tseslintConfigs.stylistic,
  eslintConfigPrettier,
  importConfigs.recommended,
  importConfigs.typescript,
  {
    plugins: { 'unused-imports': unusedImports },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: true,
      },
    },
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      curly: ['error', 'all'],

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
      'import/first': 'error',
      'import/no-unresolved': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',

      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['**/dist/**', '**/build/**'],
  },
) as Linter.Config[];
