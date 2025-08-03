import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(import.meta.dirname, "dist/webpack"),
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.jsdelivr.net/npm/ejs@3.1.10/ejs.min.js"></script>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>
          `,
    }),
  ],
  module: {
    rules: [
      {
        resourceQuery: /inline/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        type: 'asset',
        resourceQuery: { not: [/inline/] },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 8 КБ в байтах
          },
        },
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        test: /\.json$/,
        type: 'asset/source',
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      
    ],
  },
};

export default config;
