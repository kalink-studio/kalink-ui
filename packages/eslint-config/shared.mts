import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { configs as tseslintConfigs } from 'typescript-eslint';

import type { Linter } from 'eslint';

export type Files = '**/*.{ts,js}' | '**/*.{ts,tsx,js,jsx}';

export const rules: Linter.RulesRecord = {
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

  '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
  '@typescript-eslint/no-unused-vars': 'off',
};

export const typescriptExtends: Linter.Config[] = [
  js.configs.recommended,
  tseslintConfigs.recommended as Linter.Config,
  tseslintConfigs.stylistic as Linter.Config,
  eslintConfigPrettier,
  importConfigs.recommended as Linter.Config,
  importConfigs.typescript as Linter.Config,
];

export const typescriptPlugins: Linter.Config['plugins'] = {
  'unused-imports': unusedImports,
};

export const typescriptSettings: Linter.Config['settings'] = {
  'import/parsers': {
    '@typescript-eslint/parser': ['.ts', '.tsx'],
  },
  'import/resolver': {
    typescript: true,
  },
};

const reactFlatConfig = pluginReact.configs.flat.recommended!;

export const reactExtends = [
  reactFlatConfig,
  pluginReactHooks.configs.flat['recommended-latest'],
];

export const reactLanguageOptions: Linter.Config['languageOptions'] = {
  ...reactFlatConfig?.languageOptions,
  globals: {
    ...globals.serviceworker,
    ...globals.browser,
  },
};

export const reactSettings: Linter.Config['settings'] = {
  react: { version: 'detect' },
};

export const reactRules: Linter.RulesRecord = {
  'react/react-in-jsx-scope': 'off',
};

/**
 * Common ignore patterns
 */
export const baseIgnores = globalIgnores(['**/dist/**', '**/build/**']);

export const nextIgnores = globalIgnores([
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/next-env.d.ts',
  '**/out/**',
]);
