import { access } from 'fs/promises';
import { basename, dirname } from 'path';
import { fileURLToPath } from 'url';

export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return __dirname;
}
