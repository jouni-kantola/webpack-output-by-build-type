const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [
  new HtmlWebpackPlugin({
    title: 'webpack output by build type',
    template: './tmpl/index.ejs'
  })
];

module.exports = {
  entry: {
    'app': './src/index.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    //publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }]]
          }
        }
      }
    ]
  },
  //devtool: 'source-map',
  plugins: plugins
};