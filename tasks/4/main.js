import fs from "node:fs";
import { transformer } from "./transformer.js";
import * as astring from "astring";
import { parse } from "acorn";

// read file with source code
const sourceCode = fs.readFileSync('./entry.js', 'utf-8');

// get ast from source code
const ast = parse(sourceCode, { ecmaVersion: 6 })
console.log(ast);
// transform ast

// convert ast to source code
const result = '';

// write source code to file
fs.writeFileSync("./result.js", result);
