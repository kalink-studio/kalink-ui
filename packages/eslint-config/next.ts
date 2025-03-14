// @ts-expect-error Declaration file is not available for the package
import pluginNext from '@next/eslint-plugin-next';

export const nextEslintConfig = [
  {
    plugins: {
      '@next/next': pluginNext,
    },
    ignores: ['**/.next/**'],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
];
