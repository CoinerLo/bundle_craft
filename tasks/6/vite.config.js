import { defineConfig } from 'vite';

export default defineConfig({
    base: '/vite/',
    build: {
        minify: false,
        lib: {
            entry: {
                entry: './src/entry.js',
                performance: './src/performance.js'
            },
            formats: ['es'],
        },
        outDir: 'dist/vite',
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                format: "esm",
            },
        }
    },
})
