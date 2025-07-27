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
        //         {
        //             entryPoints: [
        //                 'src/auth/auth.jsx',
        //             ],
        //             filename: 'auth.html',
        //             title: 'Login',
        //             scriptLoading: 'module',
        //             favicon: './public/favicon.ico',
        //             hash: true,
        //         },
        //         {
        //             entryPoints: [
        //                 'src/installation/installation.jsx',
        //             ],
        //             filename: 'installation.html',
        //             title: 'title',
        //             scriptLoading: 'module',
        //             define: {
        //                 "version": "0.3.0",
        //             },
        //             htmlTemplate: `
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     </head>
        //     <body>
        //         You are using version <%- define.version %>
        //         <div id="root">
        //         </div>
        //     </body>
        //     </html>
        //   `,
        //         },
            ]
        })
  ],
}

esbuild.build(options).catch(() => process.exit(1))
