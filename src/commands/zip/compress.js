import { createReadStream, createWriteStream } from 'fs';
import { lstat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { isAbsolute, resolve } from 'path';
import { BrotliCompress } from 'zlib';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';

export const compress = async (pathToFile, pathToDest) => {
  if (!pathToFile || !pathToDest) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(pathToFile)
    ? pathToFile
    : resolve(process.cwd(), pathToFile);
  const dest = isAbsolute(pathToDest)
    ? pathToDest
    : resolve(process.cwd(), pathToDest);

  await lstat(src).catch(() => { throw new Error(OPERATION_ERROR) });

  const srcStream = createReadStream(src);
  const destStream = createWriteStream(dest, { flags: 'wx' });
  const brotliStream = new BrotliCompress();

  return pipeline(srcStream, brotliStream, destStream)
    .then(
      res => res,
      () => { throw new Error(OPERATION_ERROR) }, 
    );
};
