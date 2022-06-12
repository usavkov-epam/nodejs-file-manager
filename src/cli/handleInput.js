import { parseArgs } from './parseArgs.js';

import {
  add,
  cat,
  cp,
  mv,
  rm,
  rn,
} from '../commands/files/index.js';
import { cd, ls, up } from '../commands/nwd/index.js';
import { VALIDATION_ERROR } from '../consants.js';

const commadsMap = {
  add,
  cat,
  cd,
  cp,
  ls,
  mv,
  rm,
  rn,
  up,
}

export const handleInput = async (input) => {
  const [command, args] = parseArgs(input);

  if (!command) return process.stderr.write(`${VALIDATION_ERROR}\n`);

  console.log('args', args);

  commadsMap[command](...args).catch((err) => process.stderr.write(`${err?.message || err}\n`));
};
