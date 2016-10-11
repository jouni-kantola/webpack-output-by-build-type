const webpack = require('webpack');

const build = process.env.BUILD && process.env.BUILD.trim();
const isProduction = build === 'production';

const definePlugin = new webpack.DefinePlugin({
  __DEV__: !isProduction,
  globalConfig: !isProduction ? JSON.stringify({ in: 'dev' }) : JSON.stringify({ in: 'prod' }) 
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: isProduction ? 'bundle.prod.js' : 'bundle.js'
  },
  plugins: [definePlugin]
};