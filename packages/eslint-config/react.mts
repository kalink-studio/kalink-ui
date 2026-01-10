import { defineConfig } from 'eslint/config';

import {
  baseIgnores,
  reactExtends,
  reactLanguageOptions,
  reactRules,
  reactSettings,
  rules,
  typescriptExtends,
  typescriptPlugins,
  typescriptSettings,
} from './shared.mjs';

/**
 * Ready-to-use ESLint config for React + TypeScript projects.
 *
 * **Note:** This config includes TypeScript support. For React-only projects
 * without TypeScript, this config is not suitable.
 *
 * Targets: .ts, .tsx, .js, .jsx files
 *
 * Usage:
 * ```ts
 * import react from '@kalink-ui/eslint-config/react';
 * export default react;
 * ```
 */
export default defineConfig([
  baseIgnores,
  // TypeScript base rules for all files
  {
    name: 'kalink/react/typescript',
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: typescriptExtends,
    plugins: typescriptPlugins,
    settings: typescriptSettings,
    rules,
  },
  // React-specific rules
  {
    name: 'kalink/react/react',
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: reactExtends,
    languageOptions: reactLanguageOptions,
    settings: reactSettings,
    rules: reactRules,
  },
]);
