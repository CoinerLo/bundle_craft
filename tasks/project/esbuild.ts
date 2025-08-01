import esbuild from 'esbuild';
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
`;

const options = {
    outdir: 'dist/esbuild',
    bundle: true,
    entryPoints: ['./src/index.tsx'],
    publicPath: '/esbuild/',
    resolveExtensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    alias: {
        "components/*": "./src/components/*",
        "containers/*": "./src/containers/*",
        "routes/*": "./src/routes/*",
        "store/*": "./src/store/*"
    },
    plugins: [
        htmlPlugin({
            files: [
                {
                    entryPoints: [
                        'src/index.tsx',
                    ],
                    filename: 'index.html',
                    htmlTemplate,
                },
            ]
        }),
    ],
}

esbuild.build(options).catch(() => process.exit(1))
