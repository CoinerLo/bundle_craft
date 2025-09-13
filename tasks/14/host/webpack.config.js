const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const mfConfig = require("./module-federation.config");

module.exports = {
  entry: "./src/index.jsx",
  mode: "development",
  devtool: false,
  output: {
    publicPath: "http://localhost:3001/",
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
                tsx: true,
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
