import react from '@kalink-ui/eslint-config/react';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(['dist/**', '**/*.d.ts']),
  ...react,
];
