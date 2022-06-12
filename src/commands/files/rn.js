import { lstat, rm } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { isAbsolute, resolve } from 'path';
import { pipeline } from 'stream/promises';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';

export const rn = async (oldFileName, newFileName) => {
  if (!oldFileName || !newFileName) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(oldFileName)
    ? pathArg
    : resolve(process.cwd(), oldFileName);
  const dest = isAbsolute(newFileName)
    ? pathArg
    : resolve(process.cwd(), newFileName);

  await lstat(src).catch(() => { throw new Error(OPERATION_ERROR) });

  const read$ = createReadStream(src);
  const write$ = createWriteStream(dest, { flags: 'wx' });

  return pipeline(read$, write$)
    .then(
      () => rm(src),
      () => { throw new Error(OPERATION_ERROR) },
    );
};
