import fs from "node:fs";
import path from "node:path";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const { imports } = packageJSON;
const rootDir = path.resolve(".");

const extensionsToResolve = ["js", "ts", "json"];

export function resolve(importPath, parentPath) {
  const splitingImportPath = importPath.split('/');
  if (splitingImportPath[0] === '..') {
    const nextDirPath = path.dirname(parentPath);
    const newPath = path.resolve(nextDirPath, importPath);
    const fileName = splitingImportPath.pop();
    const splitingFileName = fileName.split('.');
    // console.log(newPath, importPath, parentPath)
    if (splitingFileName.length < 2) {
      let result = null;
      const iter = [...extensionsToResolve];
      while (result === null && iter.length > 0) {
        const ext = iter.shift();
        const next = newPath + '.' + ext;
        result = isFileExists(next);
        console.log(result, next)
      }

        console.log(result)
      return result;
    } else {
      return isFileExists(newPath);
    }
  } else {
    
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
