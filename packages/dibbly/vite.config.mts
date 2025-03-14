/// <reference types="vitest" />

import tsconfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

export default {
  plugins: [tsconfigPaths()],
  test: {},
} satisfies UserConfig;
