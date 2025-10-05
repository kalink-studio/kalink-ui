import {
  baseEslintConfig,
  reactEslintConfig,
  nextEslintConfig,
} from '@kalink-ui/eslint-config';

import type { Linter } from 'eslint';


const webEslintConfig: Linter.FlatConfig[] = [
  ...baseEslintConfig,
  ...reactEslintConfig,
  ...nextEslintConfig,
];

export default webEslintConfig;
