const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require("path")

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "./src"), // js 目录下的才需要经过 babel-loader 处理
        ],
        loader: "eslint-loader",
        enforce: 'pre',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    open: true
  },
})