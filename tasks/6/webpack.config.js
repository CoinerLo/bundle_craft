import path from "node:path";

const config = {
    entry: {
        entry: './src/entry.js',
        performance: './src/performance.js'
    },
    output: {
        path: path.resolve("./dist/webpack"),
        publicPath: '/webpack/',
    },
};

export default config;
