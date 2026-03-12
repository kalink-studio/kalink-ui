import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const packageDir = path.resolve(dirname, '..');

const remove = (targetPath, options = {}) =>
  rm(targetPath, {
    force: true,
    maxRetries: 10,
    retryDelay: 100,
    ...options,
  });

await Promise.all([
  remove(path.join(packageDir, 'dist'), { recursive: true }),
  remove(path.join(packageDir, 'tsconfig.tsbuildinfo')),
]);
