import fg from 'fast-glob';
import { watch } from 'chokidar';

const changedFilesLog = [];

export function getLog() {
  return changedFilesLog;
}

let watcher;

export async function subscribe() {
  const glob = await fg.glob('./src/**/*.js');
  watcher = watch(glob).on('change', (path, stats) => {
    changedFilesLog.push(path);
    // console.log(stats, path);
  });
}

export function unsubscribe() {
  watcher
    .close();
    // .then(() => console.log('closed'));
}
