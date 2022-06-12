import {
  arch,
  cpus,
  EOL,
  homedir,
  userInfo
} from 'os';

import { OPERATION_ERROR, VALIDATION_ERROR } from '../../consants.js';

const flagsMap = {
  architecture: arch,
  cpus: () => {
    const _cpus = cpus();
    const totalCPUS = _cpus.length;

    return {
      totalCPUS,
      cpus: _cpus.map(({ model }) => model),
    };
  },
  EOL: () => EOL,
  homedir,
  username: () => userInfo().username,
};

export const os = async (flag = '') => {
  if (!flag.startsWith('--')) throw new Error(VALIDATION_ERROR);

  const _flag = flag.replaceAll('--', '');

  if (!(Object.keys(flagsMap).includes(_flag))) throw new Error(VALIDATION_ERROR);

  try {
    return console.log(flagsMap[_flag]());
  } catch {
    throw new Error(OPERATION_ERROR);
  }
};
