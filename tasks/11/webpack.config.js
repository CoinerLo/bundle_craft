import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import rsdoctor from "@rsdoctor/webpack-plugin";

const config = {
  entry: "./src/main.tsx",
  mode: "production",
  devtool: false,
  experiments: {
    css: true,
    topLevelAwait: true,
  },
  output: {
    publicPath: '/webpack/',
    path: path.resolve(import.meta.dirname, 'dist/webpack'),
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      assert: false,
      buffer: false,
      console: false,
      constants: false,
      crypto: false,
      domain: false,
      events: false,
      http: false,
      https: false,
      os: false,
      path: false,
      punycode: false,
      process: false,
      querystring: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      url: false,
      util: false,
      vm: false,
      zlib: false,
      fs: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new rsdoctor.RsdoctorWebpackPlugin(),
  ],
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
      // { test: /\.(html)$/, use: ['html-webpack-plugin'] },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(svg|png)$/,
        type: 'asset/resource', // для обычных импортов как URL
      },
    ],
  },
};

export default config;
