import react from '@kalink-ui/eslint-config/react';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(['storybook-static/**', 'turbo/**', '**/*.d.ts']),
  ...react,
];
