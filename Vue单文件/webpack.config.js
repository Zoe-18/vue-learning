const { VueLoaderPlugin } = require('vue-loader')
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = path.resolve

const isProd = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '..', 'dist'),

  },
  // resolve: {
  //   extenions: ['.js', '.vue', '.json', '.ts']
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']  // vue-style-loader 不需要额外安装，vue-loader中有
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'src' , 'index.html')
    })
  ],
  mode: isProd ? 'production' : 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
}

