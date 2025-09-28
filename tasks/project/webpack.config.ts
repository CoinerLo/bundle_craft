import { Compiler, Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import rsdoctor from "@rsdoctor/webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const addNonce = (script: { attributes: { nonce: string; }; }) => {
  script.attributes.nonce = '{{NONCE_VALUE}}';
  return script;
}

const templateContent = ({ htmlWebpackPlugin }: any) => {
  const { tags } = htmlWebpackPlugin;
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"
    <script nonce="{{NONCE_VALUE}}">window.webpack_nonce="{{NONCE_VALUE}}"</script>
    ${tags.headTags.map(addNonce)}
  </head>
  <body>
    <div id="root"></div>
    ${tags.bodyTags.map(addNonce)}
  </body>
</html>
`};

class AddNoncePlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('AddNoncePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'AddNoncePlugin',
        (data, cb) => {
          const nonce = data.plugin.options?.nonce;
          if (!nonce) {
            cb(null, data);
            return;
          }

          data.assetTags.scripts.forEach(tag => {
            if (tag.tagName === 'script') {
              tag.attributes = tag.attributes || {};
              tag.attributes.nonce = nonce;
            }
          });

          data.assetTags.styles.forEach(tag => {
            if (tag.tagName === 'link' || tag.tagName === 'style') {
              tag.attributes = tag.attributes || {};
              tag.attributes.nonce = nonce;
            }
          });

          cb(null, data);
        }
      );
    });
  }
}

const config: Configuration = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("./dist/webpack"),
    publicPath: '/webpack/',
    filename: '[name]_[contenthash:8].js',
    chunkFilename: '[name]_[contenthash:8].js',
    assetModuleFilename: '[name]_[hash:8][ext]',
    clean: true,
  },
  devtool: 'hidden-source-map',
  mode: isProduction ? "production" : "development",
  target: ['web', 'es5'],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            "jsc": {
              "parser": {
                "syntax": "typescript",
                "tsx": true
              },
              "transform": {
                "react": {
                  "runtime": "automatic"
                }
              }
            },
            "module": {
              "type": "commonjs"
            }
          }
        },
      },
      { test: /\.(html)$/, use: ['html-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      templateContent,
      // inject: true,
      // nonce: '{{NONCE_VALUE}}',
    }),
    new rsdoctor.RsdoctorWebpackMultiplePlugin(),
    // new AddNoncePlugin(),
  ],
  experiments: {
    css: true
  }
};

export default config;
