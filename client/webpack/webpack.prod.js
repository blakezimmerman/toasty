const path = require("path");
const webpackMerge = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const { APP_DIR, BUILD_DIR, commonConfig } = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
  mode: "production",

  entry: [path.resolve(APP_DIR, "index.tsx")],

  output: {
    path: BUILD_DIR,
    filename: "[name].[chunkhash].js",
    publicPath: "/"
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: true
  },

  plugins: [
    new CompressionPlugin({
      minRatio: 0.6,
      threshold: 5000
    })
  ]
});
