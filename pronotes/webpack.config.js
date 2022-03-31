const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "pronotesKernel.js",
    library: {
      type: "umd",
      name: "pronotesKernel",
    },
  },
};
