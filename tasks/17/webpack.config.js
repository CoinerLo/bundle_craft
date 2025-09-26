import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(import.meta.dirname, 'dist/webpack'),
        filename: 'main.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.module\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: '[path][name]_[hash:base64:5]',
                            }
                        }
                    },
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
    ]
};

export default config;
