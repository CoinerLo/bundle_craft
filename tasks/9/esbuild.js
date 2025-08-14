import esbuild from "esbuild";
import YamlLoader from './plugins/esbuild-plugin-yaml.js';

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outdir: "dist/esbuild",
  plugins: [
    YamlLoader(),
  ],
};

esbuild.build(options).catch(() => process.exit(1));
