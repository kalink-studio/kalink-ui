import { withPayload } from '@payloadcms/next/withPayload';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['@kalink-ui/seedly'],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Suppress noisy cache serialization warnings and improve cache perf
    config.infrastructureLogging = {
      ...(config.infrastructureLogging || {}),
      level: 'error',
    };

    return config;
  },
};

export default withPayload(withVanillaExtract(nextConfig));
