import fs from "node:fs";
import path from "node:path";
import { watch } from 'chokidar';

import { bundle } from "./bundle.js";

const entryPath = process.argv[2];
const output = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });
fs.writeFileSync(`./dist/main.js`, output);

// Реализуйте watch здесь

export default function watch() {
    const dir = path.dirname(entryPath);
    console.log('Start watch');
    watch(dir).on('change', (path, stats) => {
        const newOutput = bundle(entryPath);
        fs.writeFileSync(`./dist/main.js`, newOutput);
    });
}
watch();
