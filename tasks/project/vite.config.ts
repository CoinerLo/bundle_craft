import { OutputBundle } from 'rollup';
import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";
const { createHash } = require('crypto');

export default defineConfig({
    base: '/vite/',
    build: {
        minify: false,
        outDir: 'dist/vite',
        assetsDir: '.',
        sourcemap: "hidden",
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
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
    plugins: [tsconfigPaths(), pluginRenameFiles()],
})

function toBase64URL(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function pluginRenameFiles() {
    return {
        name: 'rename-files-with-hash',
        async generateBundle(_options, bundle: OutputBundle) {
            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (chunk.type === 'chunk') {
                    const code = chunk.code;

                    // Считаем хеш от содержимого
                    const hash = createHash('sha256').update(code).digest();
                    const shortHash = toBase64URL(hash).slice(0, 8);

                    // Получаем базовое имя без расширения
                    const name = fileName.replace(/\.\w+$/, '').toLowerCase(); // -> 'index', 'main'

                    // Определяем расширение
                    const ext = fileName.split('.').pop(); // -> 'js'

                    // Новое имя: [name]_[hash:8].[ext]
                    const newName = `${name}_${shortHash}.${ext}`;

                    // Переименовываем файл
                    chunk.fileName = newName;
                }
            }
        },
    }
};
