import { createWriteStream } from 'fs';
import { resolve } from 'path';

import { VALIDATION_ERROR, OPERATION_ERROR } from '../../consants.js';

export const add = async (filename) => {
  if (!filename) throw new Error(VALIDATION_ERROR);

  const filePath = resolve(process.cwd(), filename);
  const stream = createWriteStream(filePath, { flags: 'wx' });

  stream.on('error', () => {
    process.stderr.write(`${OPERATION_ERROR}\n`);
  });
};
