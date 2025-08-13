import { yamlToObj } from "./yamlToObj.js";

// аналог лоадера в вебпаке
export default function YamlLoader() {
    return {
        name: "yaml-loader",
        // resolveId(source, imported, options) {},
        // load(id) {},
        // moduleParsed(moduleInfo) {},
        transform(code, id) {
            if (id.endsWith(".yaml") || id.endsWith(".yml")) {
                const obj = yamlToObj(code);
                const str = JSON.stringify(obj);
                return `export default ${str}`;
            }
            return null;
        },
    }
}

// аналог плагина в вбепаке
// export default function myPlugin() {
//     return {
//         name: "yaml-plugin",
//         buildStart(options) {},
//         options(options) {},
//     }
// }
