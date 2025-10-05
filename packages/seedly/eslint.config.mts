import { baseEslintConfig, reactEslintConfig } from '@kalink-ui/eslint-config';

import type { Linter } from 'eslint';


const seedlyEslintConfig: Linter.FlatConfig[] = [
  ...baseEslintConfig,
  ...reactEslintConfig,
];

export default seedlyEslintConfig;
