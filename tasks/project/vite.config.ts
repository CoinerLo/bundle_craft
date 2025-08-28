import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: '/vite/',
    build: {
        minify: false,
        outDir: 'dist/vite',
        assetsDir: '.',
        sourcemap: "hidden",
    },
    resolve: {
        alias: {
            "components/*": "./src/components/*",
            "containers/*": "./src/containers/*",
            "routes/*": "./src/routes/*",
            "store/*": "./src/store/*",
        },
    },
    plugins: [tsconfigPaths()],
})
