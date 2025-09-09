import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts',
  output: {
    preserveModules: true,
    dir: "./lib",
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
