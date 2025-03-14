import turboPlugin from 'eslint-plugin-turbo';

export const turboEslintConfig = [
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
];
