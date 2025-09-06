/// <reference types="vitest" />

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json' assert { type: 'json' };

import type { UserConfig } from 'vite';

const externalPkgs = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];

function isExternal(id: string) {
  return externalPkgs.some((dep) => id === dep || id.startsWith(`${dep}/`));
}

export default {
  plugins: [tsconfigPaths(), react(), vanillaExtractPlugin()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    emptyOutDir: true,
  },
  test: {},
} satisfies UserConfig;
