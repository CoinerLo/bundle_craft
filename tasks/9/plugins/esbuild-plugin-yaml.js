import fs from "node:fs/promises";
import { yamlToObj } from "./yamlToObj.js";

export default function YamlLoader() {
    return {
        name: 'yaml-loader',
        setup(build) {
            build.onLoad({ filter: /\.(yaml|yml)/ }, async (args) => {
                const data = await fs.readFile(args.path, 'utf-8');
                const obj = yamlToObj(data);
                const str = JSON.stringify(obj);
                return {
                    contents: `export default ${str}`,
                };
            })
        }
    }
}
