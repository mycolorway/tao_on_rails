const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'tao.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'tao',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
};
