import { yamlToObj } from './yamlToObj.js';

export default function YamlLoader(source) {
    const obj = yamlToObj(source);
    const str = JSON.stringify(obj);
    return `export default ${str}`;
}
