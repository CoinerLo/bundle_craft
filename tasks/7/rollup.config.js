import html from "@rollup/plugin-html";
import url from "@rollup/plugin-url";
import { string } from "rollup-plugin-string";

export default {
  input: "./src/rollup-entry.js",
  output: {
    file: "./dist/rollup/main.js",
    format: "iife",
    assetFileNames: "[name][extname]",
  },
  plugins: [
    string({
      include: ['**/*.ejs', '**/*.json'],
    }),
    url({
      publicPath: 'http://localhost:3000/rollup/',
      include: [
        /\.(svg|png)$/
      ],
      exclude: /\.inline\.svg$/,
      limit: 3072,
      fileName: 'assets/[name][extname]',
      // limit: (fileInfo) => {
      //   const { name, size } = fileInfo;
      //   if (name.endsWith('.inline.')) {
      //     return Infinity;
      //   }
      //   return 3072;
      // },
    }),
    url({
      include: [
        /\.inline\.svg$/,
      ],
      limit: Infinity,
    }),
    html({
      template: ({ files, title }) => {
        const scripts = (files.js || [])
          .map(
            ({ fileName }) =>
              `<script type="module" src="${fileName}"></script>`
          )
          .join("\n");

        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/ejs@3.1.10/ejs.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    ${scripts}
  </body>
</html>`;
      },
    }),
  ],
};
