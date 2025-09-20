import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config = {
    mode: 'development',
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
                            esModule: false,
                            modules: {
                                localIdentName: '[path][name]_[hash:base64:5]',
                            }
                        }
                    },
                ]
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        })
    ]
};

export default config;
