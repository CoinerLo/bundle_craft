import { defineConfig } from 'vite';

export default defineConfig({
    base: '/vite/',
    build: {
        minify: false,
        outDir: 'dist/vite',
        rollupOptions: {
            input: {
                entry: "./src/entry.js",
                performance: './src/performance.js',
            },
            output: {
                entryFileNames: '[name].js',
            },
        }
    },
})
