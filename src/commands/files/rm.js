import { rm as remove } from 'fs/promises';
import { resolve } from 'path';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';
import { getDirname } from '../../utils.js';

const __dirname = getDirname(import.meta.url);

export const rm = async (filePath) => {
  if (!filePath) throw new Error(VALIDATION_ERROR);

  const src = resolve(__dirname, filePath);

  return remove(src).catch(() => { throw new Error(OPERATION_ERROR) });
};
