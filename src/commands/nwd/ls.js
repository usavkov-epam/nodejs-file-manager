import { readdir } from 'fs/promises';

import {
  CLEAR_COLOR,
  DIR_COLOR,
  FILE_COLOR,
} from '../../consants.js';

const DIR = `${DIR_COLOR}[DIR]${CLEAR_COLOR}`;
const FILE = `${FILE_COLOR}[FILE]${CLEAR_COLOR}`;

const getDashes = (str, maxLength) => {
  return '-'.repeat(maxLength + 5 - str.length);
}

export const ls = async () => {
  readdir(process.cwd(), { withFileTypes: true }).then((files) => {
    const maxLength = files.reduce((acc, file) => {
      return Math.max(acc, file.name.length);
    }, 0);

    files.forEach((file) => {
      process.stdout.write(`${file.name} ${getDashes(file.name, maxLength)} ${file.isDirectory() ? DIR : FILE}\n`);
    });
  });
};
