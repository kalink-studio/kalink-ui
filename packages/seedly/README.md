# `seedly`

Seedly is a React UI component library powered by vanilla-extract and the Kalink UI design system.

## Install

```bash
pnpm add @kalink-ui/seedly
```

## Next.js setup

Seedly ships TypeScript and vanilla-extract sources, so Next.js must transpile the package.

```ts
// next.config.ts
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  transpilePackages: ['@kalink-ui/seedly'],
};

export default withVanillaExtract(nextConfig);
```

Import Seedly layers and your system theme once in `app/layout.tsx`:

```ts
import '@kalink-ui/seedly/styles/reset';
import '@kalink-ui/seedly/styles/layers';
import '../style/system-theme.css';
```
