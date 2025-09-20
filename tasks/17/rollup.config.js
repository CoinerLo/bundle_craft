import postcss from "rollup-plugin-postcss";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/rollup/main.js',
        format: 'iife',
        sourcemap: false,
    },
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs(),
        postcss({
            modules: {
                generateScopedName: '[path][name]_[hash:base64:5]'
            },
            extract: true,
            minimize: true
        }),
        html({
            fileName: 'index.html',
            title: 'Rollup CSS Modules demo',
            template: ({ attributes, files, meta, publicPath, title }) => {
                const css = (files.css || []).map(f => `<link rel="stylesheet" href="${f.fileName}">`).join('\n');
                const js = (files.js || []).map(f => `<script src="${f.fileName}"></script>`).join('\n');
                return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>${css}</head><body><div id="root"></div>${js}</body></html>`;
            }
        }),
    ]
};
