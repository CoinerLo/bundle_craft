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
  const file = fs.readFileSync(path.resolve(entryPath), 'utf8');
  const requireCalls = searchRequireCalls(file);
  console.log(entryPath, file, requireCalls)
  const nextFile = fs.readFileSync(path.resolve(path.dirname(entryPath), requireCalls[0], ), 'utf8');
  console.log(nextFile)
  const fileWithRuntime = '(()=>{\n' + file + '})()';
  return fileWithRuntime;
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
