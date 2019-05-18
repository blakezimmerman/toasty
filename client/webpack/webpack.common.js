const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const path = require("path");

exports.APP_DIR = path.resolve(__dirname, "../src");
exports.NODE_MODULES_DIR = path.resolve(__dirname, "../node_modules");
exports.BUILD_DIR = path.resolve(__dirname, "../dist");

exports.commonConfig = {
  resolve: {
    extensions: [".js", ".mjs", ".ts", ".tsx"],
    modules: [this.APP_DIR, this.NODE_MODULES_DIR],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [this.APP_DIR],
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(pdf|png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
        use: "file-loader?name=static/assets/[hash].[ext]",
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(this.APP_DIR, "index.html"),
    }),
    new DefinePlugin({ "process.env.API": JSON.stringify("http://localhost:5000") }),
  ],
};
