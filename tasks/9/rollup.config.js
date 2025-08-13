
import YamlLoader from './plugins/rollup-plugin-yaml.js';

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/rollup/main.js",
    format: "esm",
  },
  plugins: [
    YamlLoader(),
  ],
};
