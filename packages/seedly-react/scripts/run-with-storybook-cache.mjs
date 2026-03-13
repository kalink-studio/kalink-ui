import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const [command, ...args] = process.argv.slice(2);

if (!command) {
  throw new Error('Expected a command to run');
}

const cacheRoot = process.env.STORYBOOK_CACHE_DIR ?? '.cache';
const absoluteCacheRoot = path.resolve(process.cwd(), cacheRoot);
const absoluteStorybookCacheRoot = path.join(absoluteCacheRoot, 'storybook');

await mkdir(absoluteCacheRoot, { recursive: true });
await mkdir(path.join(absoluteStorybookCacheRoot, 'default', 'coverage'), {
  recursive: true,
});

const child = spawn('pnpm', ['exec', command, ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    CACHE_DIR: absoluteCacheRoot,
  },
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
