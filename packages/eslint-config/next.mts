import pluginNext from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

import {
  nextIgnores,
  reactExtends,
  reactLanguageOptions,
  reactRules,
  reactSettings,
  rules,
  typescriptExtends,
  typescriptPlugins,
  typescriptSettings,
} from './shared.mjs';

import type { Linter } from 'eslint';

/**
 * Ready-to-use ESLint config for Next.js projects.
 *
 * **Note:** This config includes TypeScript and React support.
 *
 * Includes: TypeScript + React + Next.js rules
 * Targets: .ts, .tsx, .js, .jsx files
 *
 * Usage:
 * ```ts
 * import next from '@kalink-ui/eslint-config/next';
 * export default next;
 * ```
 */
export default defineConfig([
  nextIgnores,
  // TypeScript base rules for all files
  {
    name: 'kalink/next/typescript',
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: typescriptExtends,
    plugins: typescriptPlugins,
    settings: typescriptSettings,
    rules,
  },
  // React-specific rules
  {
    name: 'kalink/next/react',
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: reactExtends,
    languageOptions: reactLanguageOptions,
    settings: reactSettings,
    rules: reactRules,
  },
  // Next.js-specific rules
  {
    name: 'kalink/next/nextjs',
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@next/next': pluginNext,
    } as Linter.Config['plugins'],
    rules: {
      ...(pluginNext.configs.recommended
        .rules as unknown as Linter.RulesRecord),
      ...(pluginNext.configs['core-web-vitals']
        .rules as unknown as Linter.RulesRecord),
    },
  },
]);
