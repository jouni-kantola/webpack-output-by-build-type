const path = require('path');

const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

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
  new WebpackMd5Hash(),
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest'
  }),
  new HtmlWebpackPlugin({
    title: 'webpack output by build type',
    template: './tmpl/index.ejs'
  })
];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    //compress: { warnings: true },
    sourceMap: true
  }));
}

module.exports = {
  entry: {
    'vendor': ['babel-polyfill', 'is-thirteen', 'no-op'],
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
            presets: [['env', { modules: false }]],
            plugins: ["syntax-dynamic-import"]
          }
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
    ]
  },
  devtool: 'source-map',
  plugins: plugins
};