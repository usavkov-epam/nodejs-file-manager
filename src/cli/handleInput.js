import { parseArgs } from './parseArgs.js';

import {
  cd,
  ls,
  up,
} from '../commands/nwd/index.js';
import { VALIDATION_ERROR } from '../consants.js';

const commadsMap = {
  cd,
  ls,
  up,
}

export const handleInput = async (input) => {
  const [command, args] = parseArgs(input);

  if (!command) return process.stderr.write(`${VALIDATION_ERROR}\n`);

  console.log('args', args);

  commadsMap[command](...args).catch((err) => process.stderr.write(`${err?.message || err}\n`));
};
