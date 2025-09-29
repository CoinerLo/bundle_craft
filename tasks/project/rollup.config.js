import css from "rollup-plugin-import-css";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";

const htmlTemplate = ({ files, title, publicPath }) => {
    const scripts = (files.js || [])
        .map(({ fileName }) => `<script type="module" src="${publicPath}${fileName}" nonce="{{NONCE_VALUE}}"></script>`)
        .join('\n ');

    const styles = (files.css || [])
        .map(({ fileName }) => `<link rel="stylesheet" href="${publicPath}${fileName}" nonce="{{NONCE_VALUE}}">`)
        .join('\n ');
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <meta property="csp-nonce" nonce="{{NONCE_VALUE}}">
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
        entryFileNames: `[name]_[hash:8].js`,
        chunkFileNames: `[name]_[hash:8].js`,
        assetFileNames: `[name]_[hash:8].[ext]`,
        sourcemap: 'hidden',
    },
    plugins: [
        nodeResolve({
            extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
        }),
        typescript(),
        commonjs({ transformMixedEsModules: true, extensions: [".js", ".ts", ".tsx", ".jsx", ".json"] }),
        css(),
        html({
            template: htmlTemplate,
            publicPath: '/rollup/',
        }),
        {
            name: 'define',
            transform(code) {
                return code
                    .replace(/\bprocess\.env\.NODE_ENV\b/g, '"production"')
                    .replace(/\bprocess\.env\b/g, '({ NODE_ENV: "production" })');
            }
        },
    ],
};
