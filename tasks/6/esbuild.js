import esbuild from 'esbuild';

const options = {
    outdir: 'dist/esbuild',
    bundle: true,
    entryPoints: ['./src/entry.js', './src/performance.js'],
    publicPath: '/esbuild/',
    resolveExtensions: ['.js'],
}

esbuild.build(options).catch(() => process.exit(1))
