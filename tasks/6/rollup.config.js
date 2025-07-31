import nodeResolve from "@rollup/plugin-node-resolve";
import html from "@rollup/plugin-html";

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
    input: {
        entry: "./src/entry.js",
        performance: './src/performance.js',
    },
    output: {
        dir: "dist/rollup",
        format: "esm",
        assetFileNames: "[name][extname]",
    },
    // plugins: [
        // nodeResolve({
        //     extensions: [".js"],
        // }),

        // html({
        //     template: htmlTemplate,
        //     publicPath: '/rollup/'
        // }),
        // {
        //     name: 'define',
        //     transform(code) {
        //         return code
        //         .replace(/\bprocess\.env\.NODE_ENV\b/g, '"production"')
        //         .replace(/\bprocess\.env\b/g, '({ NODE_ENV: "production" })');
        //     }
        // },
    // ],
};
