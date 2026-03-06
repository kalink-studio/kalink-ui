import react from '@kalink-ui/eslint-config/react';
import { globalIgnores } from 'eslint/config';

const tsconfigPath = new URL('./tsconfig.json', import.meta.url).pathname;

export default [
  globalIgnores(['.cache/**', 'storybook-static/**', 'turbo/**', '**/*.d.ts']),
  ...react,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: tsconfigPath,
        },
      },
    },
  },
];
