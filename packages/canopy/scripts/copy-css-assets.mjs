import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const packageDir = path.resolve(dirname, '..');
const srcDir = path.join(packageDir, 'src');
const distDir = path.join(packageDir, 'dist');

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const nextPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(nextPath)));
      continue;
    }

    files.push(nextPath);
  }

  return files;
};

const copyCssAssets = async () => {
  await mkdir(distDir, { recursive: true });

  const srcFiles = await walk(srcDir);
  const cssFiles = srcFiles.filter((file) => file.endsWith('.css'));
  const expectedDistFiles = new Set();

  for (const file of cssFiles) {
    const relativePath = path.relative(srcDir, file);
    const targetPath = path.join(distDir, relativePath);

    expectedDistFiles.add(targetPath);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await cp(file, targetPath);
  }

  const distFiles = await walk(distDir).catch(() => []);

  await Promise.all(
    distFiles
      .filter((file) => file.endsWith('.css'))
      .filter((file) => !expectedDistFiles.has(file))
      .map((file) => rm(file)),
  );
};

await copyCssAssets();
