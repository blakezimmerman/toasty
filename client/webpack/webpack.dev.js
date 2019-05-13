const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const { APP_DIR, commonConfig } = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
  mode: "development",

  entry: [path.resolve(APP_DIR, "index.tsx")],

  output: {
    filename: "[name].js",
    publicPath: "/"
  },

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    progress: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
