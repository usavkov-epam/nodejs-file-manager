import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { basename, isAbsolute, resolve } from 'path';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';
import { getDirname } from '../../utils.js';

const __dirname = getDirname(import.meta.url);

export const cp = async (filePath, dirPath) => {
  if (!filePath || !dirPath) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(filePath)
    ? pathArg
    : resolve(__dirname, filePath);
  const dest = isAbsolute(dirPath)
    ? pathArg
    : resolve(__dirname, dirPath, basename(src));

  const read$ = createReadStream(src);
  const write$ = createWriteStream(dest, { flags: 'wx' });

  return pipeline(read$, write$)
    .then(
      res => res,
      () => { throw new Error(OPERATION_ERROR) },
    );
};
