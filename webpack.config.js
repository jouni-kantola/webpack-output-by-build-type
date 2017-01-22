const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestPlugin = require('inline-manifest-webpack-plugin');

const buildType = require('./build-type');
const isProduction = buildType.PRODUCTION;

console.log('Build type:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['manifest'],
    minChunks: Infinity
  }),
  new HtmlWebpackPlugin({
    title: 'webpack output by build type',
    template: './tmpl/index.ejs'
  }),
  new InlineManifestPlugin()
];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }));
}

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
    filename: isProduction ? '[name].[chunkhash].prod.js' : '[name].[chunkhash].dev.js'
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
  plugins: plugins
};
