import { rm } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { isAbsolute, resolve } from 'path';
import { pipeline } from 'stream/promises';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';
import { getDirname } from '../../utils.js';

const __dirname = getDirname(import.meta.url);

export const rn = async (oldFileName, newFileName) => {
  if (!oldFileName || !newFileName) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(oldFileName)
    ? pathArg
    : resolve(__dirname, oldFileName);
  const dest = isAbsolute(newFileName)
    ? pathArg
    : resolve(__dirname, newFileName);

  const read$ = createReadStream(src);
  const write$ = createWriteStream(dest, { flags: 'wx' });

  return pipeline(read$, write$)
    .then(() => rm(src))
    .catch(() => {
      rm(dest).catch(() => { throw new Error(OPERATION_ERROR) });
      throw new Error(OPERATION_ERROR);
    });
};
