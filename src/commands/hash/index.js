import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { isAbsolute, resolve } from 'path';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';
import { getDirname } from'../../utils.js';

const __dirname = getDirname(import.meta.url);

export const hash = async (filePath) => {
  if (!filePath) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(filePath)
    ? filePath
    : resolve(__dirname, filePath);

  try {
    const read$ = createReadStream(src);
    const hash = createHash('sha256').setEncoding('hex');

    const transform$ = new Transform({
      transform(chunk, _encoding, callback) {
        process.stdout.write(`${chunk}\n`)
        callback(null, chunk);
      }
    });

    return pipeline(read$, hash, transform$)
      .then(
        res => res,
        () => { throw new Error(OPERATION_ERROR) },
      )
  } catch {
    throw new Error(OPERATION_ERROR);
  }
};
