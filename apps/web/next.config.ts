import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['@kalink-ui/seedly', '@kalink-ui/dibbly'],
};

export default withVanillaExtract(nextConfig);

