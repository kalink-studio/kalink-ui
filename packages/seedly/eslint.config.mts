import typescript from '@kalink-ui/eslint-config/typescript';
import { globalIgnores } from 'eslint/config';

const tsconfigPath = new URL('./tsconfig.json', import.meta.url).pathname;

export default [
  globalIgnores(['dist/**', '**/*.d.ts']),
  ...typescript,
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
