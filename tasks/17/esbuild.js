import esbuild from "esbuild";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
import postCSSPlugin from "esbuild-postcss-plugin";

const options = {
    entryPoints: ["src/index.js"],
    bundle: true,
    outdir: "dist/esbuild",
    sourcemap: false,
    minify: false,
    loader: {
        ".js": "js",
    },
    plugins: [
        htmlPlugin({
            files: [
                {
                    entryPoints: ["src/index.js"],
                    filename: "index.html",
                    findRelatedCssFiles: true,
                    htmlTemplate: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>esbuild + CSS Modules</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
                },
            ],
        }),
        postCSSPlugin({
            modulesOptions: {
                generateScopedName: "[path][name]_[hash:base64:5]",
            },
        }),
    ],
};

esbuild.build(options).catch(() => process.exit(1));
