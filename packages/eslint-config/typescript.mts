import { defineConfig } from 'eslint/config';

import {
  baseIgnores,
  rules,
  typescriptExtends,
  typescriptPlugins,
  typescriptSettings,
} from './shared.mjs';

/**
 * Ready-to-use ESLint config for TypeScript projects.
 * Targets: .ts, .js files
 *
 * Usage:
 * ```ts
 * import typescript from '@kalink-ui/eslint-config/typescript';
 * export default typescript;
 * ```
 */
export default defineConfig([
  baseIgnores,
  {
    name: 'kalink/typescript',
    files: ['**/*.{ts,js}'],
    extends: typescriptExtends,
    plugins: typescriptPlugins,
    settings: typescriptSettings,
    rules,
  },
]);
