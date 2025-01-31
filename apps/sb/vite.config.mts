import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

export default {
  plugins: [tsconfigPaths(), react(), vanillaExtractPlugin()],
} satisfies UserConfig;
