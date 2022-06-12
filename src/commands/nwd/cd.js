import { isAbsolute, resolve } from 'path';

import { VALIDATION_ERROR, OPERATION_ERROR } from '../../consants.js';

export const cd = async (pathArg) => {
  if (!pathArg) throw new Error(VALIDATION_ERROR);

  const pathTo = isAbsolute(pathArg)
    ? pathArg
    : resolve(process.cwd(), pathArg);

  try {
    process.chdir(pathTo);
  } catch (error) {
    throw new Error(OPERATION_ERROR)
  }
};
