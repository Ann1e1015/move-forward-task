const path = require('path')
const context = path.resolve(__dirname, './')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: context,
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.jsx$/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, './src') // js 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024, // 10 KB,
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      templateParameters: {
        BASE_URL: './public/'
      },
      entry: 'src/main.js'
    }),
    new VueLoaderPlugin()
  ]
}
