import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: '/vite/',
    build: {
        minify: false,
        outDir: 'dist/vite',
        assetsDir: '.',
        sourcemap: "hidden",
        rollupOptions: {
            output: {
                entryFileNames: `[name]_[hash:8].js`,
                chunkFileNames: `[name]_[hash:8].js`,
                assetFileNames: `[name]_[hash:8].[ext]`,
            },
        },
    },
    resolve: {
        alias: {
            "components/*": "./src/components/*",
            "containers/*": "./src/containers/*",
            "routes/*": "./src/routes/*",
            "store/*": "./src/store/*",
        },
    },
    html: {
        cspNonce: '{{NONCE_VALUE}}'
    },
    plugins: [tsconfigPaths()],
})
