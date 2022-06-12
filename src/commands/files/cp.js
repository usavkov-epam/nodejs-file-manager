import { createReadStream, createWriteStream } from 'fs';
import { lstat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { basename, isAbsolute, resolve } from 'path';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';

export const cp = async (filePath, dirPath) => {
  if (!filePath || !dirPath) throw new Error(VALIDATION_ERROR);

  const src = isAbsolute(filePath)
    ? pathArg
    : resolve(process.cwd(), filePath);
  const dest = isAbsolute(dirPath)
    ? pathArg
    : resolve(process.cwd(), dirPath, basename(src));

  await lstat(filePath).catch(() => { throw new Error(OPERATION_ERROR) });

  const read$ = createReadStream(src);
  const write$ = createWriteStream(dest, { flags: 'wx' });

  return pipeline(read$, write$)
    .then(
      res => res,
      () => { throw new Error(OPERATION_ERROR) },
    );
};
