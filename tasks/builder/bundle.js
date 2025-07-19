import fs from "node:fs";
import path from "node:path";

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 * 
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля испльзуйте path.resolve (вам нужен путь до родителя где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath) {
  const modules = {};
  modules[entryPath] = fs.readFileSync(path.resolve(entryPath), 'utf8');
  const pathList = searchRequireCalls(modules[entryPath]);

  const getData = () => {
    if (pathList.length) {
      const nextFilePath = pathList.pop();
      const nextDirPath = path.dirname(entryPath);
      const nextFile = fs.readFileSync(path.resolve(nextDirPath, nextFilePath), 'utf8');

      modules[nextFilePath] = nextFile;

      const nextPathList = searchRequireCalls(nextFile);
      pathList.push(...nextPathList);
      getData();
    }
  }

  getData();

  const result = `
var modules = {\n${Object.entries(modules).map(([key, val]) => `\t'${key}': new Function('module', 'require', \`\n${val}\`)`).join(',\n')}};
function __require__(moduleId) {
  var module = {
    exports: {}
  };

  modules[moduleId](module, __require__);
  return module.exports;
}
__require__('${entryPath}');`

  return result;
}

/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code 
 */
function searchRequireCalls(code) {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2]
  );
}
