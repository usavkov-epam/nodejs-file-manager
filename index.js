import { createInterface } from 'readline';

import { handleInput } from './src/cli/index.js'

const username = process.argv
  .find(arg => arg.startsWith('--username'))
  .split('=')[1];

const start = (username = 'Guest') => {
  process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
  process.stdout.write(`You are currently in ${process.cwd()}!\n`);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (line) => {
    await handleInput(line);
    process.stdout.write(`You are currently in ${process.cwd()}!\n`);
  });

  rl.on('close', () => {
    process.stdout.write(`\nThank you for using File Manager, ${username}!\n`);
  });
}

start(username);
