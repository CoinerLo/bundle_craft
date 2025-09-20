import HtmlWebpackPlugin from "html-webpack-plugin";
import { GenerateSW } from "workbox-webpack-plugin";

export default {
    entry: "./src/index.js",
    mode: "development",
    target: ['web', 'es5'],
    resolve: {
        extensions: [".js", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './template.html' }),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            navigateFallback: '/template.html',
        }),
    ],
};
