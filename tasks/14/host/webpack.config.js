const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const mfConfig = require("./module-federation.config");

module.exports = {
  entry: "./src/bootstrap.js",
  mode: "development",
  devtool: false,
  output: {
    publicPath: "http://localhost:3002/",
  },
  devServer: {
    port: 3002,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ModuleFederationPlugin(mfConfig),
    new HtmlWebpackPlugin({
      template: "./template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  runtime: "classic",
                },
              },
            },
          }
        },
      },
    ],
  },
};
