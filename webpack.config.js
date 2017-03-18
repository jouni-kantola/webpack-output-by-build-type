const path = require('path');

const webpack = require('webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const buildType = require('./build-type');
const isProduction = buildType.PRODUCTION;

console.log('Build type:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: !isProduction,
    globalConfig: !isProduction ? JSON.stringify({ in: 'dev' }) : JSON.stringify({ in: 'prod' })
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new WebpackChunkHash(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new HtmlWebpackPlugin({
    title: 'webpack output by build type',
    template: './tmpl/index.ejs'
  }),
  new ScriptExtHtmlWebpackPlugin({
    inline: ['manifest'],
    defaultAttribute: 'defer'
  })
];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    //compress: { warnings: true },
  }));
}

module.exports = {
  entry: {
    'vendor': ['is-thirteen', 'no-op'],
    'app': './src/index.js'
  },
  output: {
    path: 'dist',
    //publicPath: '/',
    filename: isProduction ? '[name].[chunkhash].prod.js' : '[name].[chunkhash].dev.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
    ]
  },
  devtool: 'source-map',
  plugins: plugins
};
