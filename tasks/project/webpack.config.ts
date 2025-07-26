import { Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const templateContent = `
<html>
    <body>
        <div id="root"></div>
    </body>
</html>
`;

const config: Configuration = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve("./dist/webpack"),
    },
    devtool: false,
    mode: isProduction ? "production" : "development",
    target: ['web', 'es5'],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
        plugins: [
            new TsconfigPathsPlugin({
                
            }),
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
            templateContent,
        }),
    ],
    experiments: {
        css: true
    }
};

export default config;
