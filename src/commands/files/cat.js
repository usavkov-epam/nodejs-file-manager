import { createReadStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';

export const cat = async (file) => {
  if (!file) throw new Error(VALIDATION_ERROR);

  const filePath = resolve(process.cwd(), file);

  const stream = createReadStream(filePath);

  stream.on('data', (data) => {
    process.stdout.write(data);
  });

  stream.on('error', () => {
    process.stderr.write(`${OPERATION_ERROR}\n`);
  });
};
