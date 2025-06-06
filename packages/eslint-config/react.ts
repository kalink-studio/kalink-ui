import { Linter } from 'eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export const reactEslintConfig = [
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...(pluginReact.configs.flat.recommended?.languageOptions ?? {}),
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
] as Linter.Config[];
