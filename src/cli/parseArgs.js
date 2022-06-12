const awailableCommands = [
  'add',
  'cat',
  'cd',
  'compress',
  'cp',
  'decompress',
  'hash',
  'ls',
  'os',
  'mv',
  'rm',
  'rn',
  'up',
];

export const parseArgs = (line) => {
  const args = line.split(' ');
  const command = args[0];

  if (!awailableCommands.includes(command)) {
    return [null, null];
  }

  return [command, args.slice(1)];
};
