import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  // entry: ['src/**/!(*.(style|css|test|spec|stories)).(ts|tsx)'],
  entry: ['src/types/utils.types.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  external: [
    'react',
    '@vanilla-extract/css',
    '@vanilla-extract/recipes',
    '@vanilla-extract/sprinkles',
    '@vanilla-extract/css-utils',
  ],
  clean: true,
  ...options,
}));
