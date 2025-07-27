import path from "node:path";
import HtmlWebpackPlugin from 'html-webpack-plugin';

const templateContent = `
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

const config = {
    entry: {
        entry: './src/entry.js',
        performance: './src/performance.js'
    },
    output: {
        path: path.resolve("./dist/webpack"),
        publicPath: '/webpack/',
    },
    devtool: false,
    target: ['web', 'es5'],
    resolve: {
        extensions: [".js", ".html"],
    },
    module: {
        rules: [
            { test: /\.(html)$/, use: ['html-loader'] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent,
            filename: 'index.html',
            chunks: ['entry', 'performance'],
        })
    ]
};

export default config;
