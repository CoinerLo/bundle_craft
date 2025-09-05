import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'es',
    },
    {
      file: 'lib/index.cjs',
      format: 'cjs',
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'lib',
      emitDeclarationOnly: true,
    })
  ],
};
