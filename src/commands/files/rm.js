import { rm as remove } from 'fs/promises';
import { resolve } from 'path';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';

export const rm = async (filePath) => {
  if (!filePath) throw new Error(VALIDATION_ERROR);

  const src = resolve(process.cwd(), filePath);

  return remove(src).catch(() => { throw new Error(OPERATION_ERROR) });
};
