import fs from "node:fs";
import crypto from 'node:crypto';
import { bundle } from "./bundle.js";

const output = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });

function hashString(str, algo = 'md5') {
    return crypto.createHash(algo).update(str).digest('base64');
}

const hash = hashString(output)

fs.writeFileSync(`./dist/main.${hash.slice(0, 6)}.js`, output);
