import fs from "node:fs";
import { resolve } from "../3/resolve.js";
import { transformer } from "../4/transformer.js";
import * as astring from "astring";
import { parse } from "acorn";
import PluginJson from './plugins/PluginJson.js';

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
  const entryContent = fs.readFileSync(entryPath, 'utf-8');
  const requireCalls = searchRequireCalls(entryContent).map((modulePath) => ({
    modulePath,
    parent: entryPath,
  }));

  const modules = [];
  const header = `const modules = {};
function require(id) {
  modules[id](require, modules[id]);
  return modules[id].exports;
};`;

  const entry = `(function(require, module) { ${entryContent} })(require, modules)`;

  while (requireCalls.length) {
    const { parent, modulePath } = requireCalls.pop();
    const resolvedModulePath = resolve(modulePath, parent);
    let moduleCode = fs.readFileSync(resolvedModulePath, 'utf-8');

    if (resolvedModulePath.endsWith('.json')) {
      moduleCode = PluginJson(moduleCode);
    } else {
      const moduleRequireCalls = searchRequireCalls(moduleCode);
      if (moduleRequireCalls.length) {
        requireCalls.push(...moduleRequireCalls.map((modulePath) => ({
          modulePath,
          parent,
        })));
      }
    }

    modules.push(`modules['${modulePath}'] = function(require, module) { ${moduleCode} };`);
  }

  return useTransformer(`${header}\n${modules.join('\n')}\n${entry}`);
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

function useTransformer(sourceCode) {
  const ast = parse(sourceCode, { ecmaVersion: 2020, sourceType: 'module'  })

  const transformedAST = transformer(ast);

  return astring.generate(transformedAST);
}
