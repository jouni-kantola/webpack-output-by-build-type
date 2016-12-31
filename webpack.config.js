const path = require('path');

const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const buildType = require('./build-type');
const isProduction = buildType.PRODUCTION;

console.log('Build type:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: !isProduction,
    globalConfig: !isProduction ? JSON.stringify({ in: 'dev' }) : JSON.stringify({ in: 'prod' }),
    DEBUG: !isProduction,
    PRODUCTION: isProduction
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new WebpackMd5Hash(),
  // new ChunkManifestPlugin({
  //   filename: "chunk-manifest.json",
  //   manifestVariable: "webpackManifest"
  // }),
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest'
  }),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new HtmlWebpackPlugin({
    title: 'webpack output by build type',
    template: './tmpl/index.ejs'
  })
];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    // compress: { warnings: false },
    // minimize: true,
    // comments: false,
    // beautify: false
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
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: plugins
};