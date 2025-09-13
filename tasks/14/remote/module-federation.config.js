module.exports = {
name: "components",
  exposes: {
    ".": "./src/index.js",
  },
  shared: {
    react: {
        singleton: true,
    },
    "react-dom": {
        singleton: true,
    }
  },
};
