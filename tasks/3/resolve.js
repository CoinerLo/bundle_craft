import fs from "node:fs";
import path from "node:path";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const { imports } = packageJSON;
const rootDir = path.resolve(".");

const extensionsToResolve = ["js", "ts", "json"];

const checkFileWithExtends = (path) => {
  const splitingImportPath = path.split('/');
  const fileName = splitingImportPath.pop();
  const splitingFileName = fileName.split('.');
  if (splitingFileName.length < 2) {
    let result = null;
    const iter = [...extensionsToResolve];
    while (result === null && iter.length > 0) {
      const ext = iter.shift();
      const next = path + '.' + ext;
      result = isFileExists(next);
    }

    return result;
  } else {
    return isFileExists(path);
  }
}

export function resolve(importPath, parentPath) {
  const startPath = importPath.slice(0, 2);
  if (startPath === '..') {
    const nextDirPath = path.dirname(parentPath);
    const newPath = path.resolve(nextDirPath, importPath);
    return checkFileWithExtends(newPath);
  } else if (startPath === '.') {
    
  } else {
    const keysAlias = Object.entries(imports);
    const isCurrentAlias = keysAlias.find((i) => {
      const result = importPath.startsWith(i[0].replace('*', ''));
      return result;
    });

    if (isCurrentAlias) {
      const i = isCurrentAlias[0].replace('*','');
      const t = isCurrentAlias[1].replace('*','');
      const newPath = rootDir + importPath.replace(i, t).slice(1);
      return checkFileWithExtends(newPath);
    } else {
      return null;
    }
  }
}

function isFileExists(filePath) {
  try {
    fs.readFileSync(filePath);
    return filePath;
  } catch (err) {
    return null;
  }
}
