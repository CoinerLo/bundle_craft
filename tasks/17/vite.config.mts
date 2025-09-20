import { defineConfig } from "vite";

export default defineConfig({
    base: '',
    build: {
        outDir: 'dist/vite',
        rollupOptions: {
            input: './index.html',
        },
    },
    css: {
        modules: {
            generateScopedName: '[path][name]_[hash:base64:5]'
        }
    }
});
