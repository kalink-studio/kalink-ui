import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import type { Linter } from 'eslint';

type PluginConfigs = Record<
  string,
  Linter.Config | Linter.Config[] | undefined
>;

interface PluginWithConfigs {
  configs: PluginConfigs;
}

const isPluginWithConfigs = (plugin: unknown): plugin is PluginWithConfigs => {
  if (typeof plugin !== 'object' || plugin === null) {
    return false;
  }

  return 'configs' in plugin;
};

const toConfigArray = (
  config: Linter.Config | Linter.Config[] | undefined,
): Linter.Config[] => {
  if (Array.isArray(config)) {
    return config;
  }

  if (config === undefined) {
    return [];
  }

  return [config];
};

const reactHooksRecommendedLatest = (): Linter.Config[] => {
  if (!isPluginWithConfigs(pluginReactHooks)) {
    return [];
  }

  return toConfigArray(pluginReactHooks.configs['recommended-latest']);
};

const reactConfigs = toConfigArray(pluginReact.configs.flat?.recommended);

const reactLanguageOptions = reactConfigs[0]?.languageOptions ?? {};

export const reactEslintConfig = defineConfig([
  ...reactConfigs,
  ...reactHooksRecommendedLatest(),
  {
    languageOptions: {
      ...reactLanguageOptions,
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
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
