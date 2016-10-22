const path = require('path');

const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const build = process.env.BUILD && process.env.BUILD.trim();
const isProduction = build === 'production';

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: !isProduction,
    globalConfig: !isProduction ? JSON.stringify({ in: 'dev' }) : JSON.stringify({ in: 'prod' }),
    DEBUG: !isProduction,
    PRODUCTION: isProduction
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ["vendor"],
    minChunks: Infinity
  }),
  new WebpackMd5Hash(),
  new ManifestPlugin(),
  new ChunkManifestPlugin({
    filename: "chunk-manifest.json",
    manifestVariable: "webpackManifest"
  }),
  new webpack.optimize.OccurenceOrderPlugin(true)
];

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  );
}
console.log('isProduction', isProduction);
module.exports = {
  entry: {
    'vendor': ['is-thirteen', 'no-op'],
    'app': './src/index.js'
  },
  output: {
    path: 'dist',
    filename: isProduction ? '[name].[chunkhash].prod.js' : '[name].[chunkhash].dev.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: plugins
};