import { access } from 'fs/promises';
import { basename, dirname } from 'path';
import { fileURLToPath } from 'url';

export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return __dirname;
}

// export const checkCanBePerformed = async ({
//   src,
//   dest,
//   srcErrorMessage,
//   destErrorMessage,
// }) => {
//   const srcCheck = src
//     ? () => access(src)
//     : () => Promise.resolve();

//   const destCheck = dest
//     ? () => access(dest)
//     : () => Promise.reject();

//   return srcCheck().then(
//     () => { // src exists
//       return destCheck().then(
//         () => { // dest exists: we don't want to overwrite file
//           throw new Error(destErrorMessage || `"${basename(dest)}" already exists`);
//         },
//         () => {
//           return Promise.resolve(); // dest doesn't exist: we can create it
//         },
//       );
//     },
//     () => { // src doesn't exist
//       throw new Error(srcErrorMessage || `"${basename(src)}" does not exists`);
//     },
//   );
// };
