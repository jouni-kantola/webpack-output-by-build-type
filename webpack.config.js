const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const InlineChunkManifestHtmlWebpackPlugin = require('./inline-chunk-manifest-html-webpack-plugin');

const buildType = require('./build-type');
const isProduction = buildType.PRODUCTION;

console.log('Build type:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: !isProduction,
    globalConfig: !isProduction ? JSON.stringify({ in: 'dev' }) : JSON.stringify({ in: 'prod' })
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: ['vendor', 'manifest'],
  //   minChunks: Infinity
  // }),
  //new webpack.NamedModulesPlugin(),  
  new webpack.HashedModuleIdsPlugin(),
  new webpack.NamedChunksPlugin(),
  new HtmlWebpackPlugin({
    title: 'webpack output by build type',
    template: './tmpl/index.ejs',
    inject: false
  }),
  new InlineChunkManifestHtmlWebpackPlugin({
    dropAsset: false
  })
];

// if (isProduction) {
//   plugins.push(new webpack.optimize.UglifyJsPlugin({
//     //compress: { warnings: true },
//     sourceMap: true
//   }));
// }

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
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   enforce: 'pre',
      //   use: {
      //     loader: 'eslint-loader'
      //   }
      // },
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: plugins
};
