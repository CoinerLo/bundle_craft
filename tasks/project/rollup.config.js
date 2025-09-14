import css from "rollup-plugin-import-css";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import { createHash } from 'crypto';

const htmlTemplate = ({ files }) => {
    const scripts = (files.js || [])
        .map(file => `<script type="module" src="/rollup/${file.name}.js"></script>`)
        .join('\n  ');

    const styles = (files.css || [])
        .map(file => `<link rel="stylesheet" href="/rollup/${file.name}">`)
        .join('\n  ');
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${styles}
    </head>
    <body>
        <div id="root"></div>
        ${scripts}
    </body>
</html>
`};

export default {
    input: "./src/index.tsx",
    output: {
        dir: "dist/rollup",
        format: "esm",
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        sourcemap: 'hidden',
    },
    plugins: [
        nodeResolve({
            extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
        }),
        typescript(),
        commonjs({ transformMixedEsModules: true, extensions: [".js", ".ts", ".tsx", ".jsx", ".json"] }),
        css({
            output: 'style.css', // имя выходного CSS
        }),
        html({
            template: htmlTemplate,
            publicPath: '/rollup/'
        }),
        {
            name: 'define',
            transform(code) {
                return code
                .replace(/\bprocess\.env\.NODE_ENV\b/g, '"production"')
                .replace(/\bprocess\.env\b/g, '({ NODE_ENV: "production" })');
            }
        },
        pluginRenameFiles(),
    ],
};

function toBase64URL(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function pluginRenameFiles() {
    return {
        name: 'rename-files-with-hash',
        async generateBundle(options, bundle) {
            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (chunk.type === 'chunk') {
                    const code = chunk.code;

                    // Считаем хеш от содержимого
                    const hash = createHash('sha256').update(code).digest();
                    const shortHash = toBase64URL(hash).slice(0, 8);

                    // Получаем базовое имя без расширения
                    const name = fileName.replace(/\.\w+$/, '').toLowerCase(); // -> 'index', 'main'

                    // Определяем расширение
                    const ext = fileName.split('.').pop(); // -> 'js'

                    // Новое имя: [name]_[hash:8].[ext]
                    const newName = `${name}_${shortHash}.${ext}`;

                    // Переименовываем файл
                    chunk.fileName = newName;
                }
            }
        },
    }
};
