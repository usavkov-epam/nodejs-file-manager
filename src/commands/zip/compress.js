import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { isAbsolute, resolve } from 'path';
import { BrotliCompress } from 'zlib';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';
import { getDirname } from '../../utils.js';

const __dirname = getDirname(import.meta.url);

export const compress = async (pathToFile, pathToDest) => {
  if (!pathToFile || !pathToDest) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(pathToFile)
    ? pathToFile
    : resolve(__dirname, pathToFile);
  const dest = isAbsolute(pathToDest)
    ? pathToDest
    : resolve(__dirname, pathToDest);

  const srcStream = createReadStream(src);
  const destStream = createWriteStream(dest, { flags: 'wx' });
  const brotliStream = new BrotliCompress();

  return pipeline(srcStream, brotliStream, destStream)
    .then(
      res => res,
      () => { throw new Error(OPERATION_ERROR) }, 
    );
};
