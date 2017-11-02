const path = require('path');
const _ = require('lodash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const defaultConfig = {
  entry: './src/tao',
  output: {
    filename: 'tao.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".js", ".json", ".coffee"]
  },
  module: {
    rules: [{
      test: /\.coffee$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }, {
        loader: 'coffee-loader'
      }]
    }]
  },
  externals : {
    lodash : {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    },
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: '$'
    }
  }
};

const railsConfig = _.extend({}, defaultConfig, {
  output: {
    filename: 'tao.js',
    path: path.resolve(__dirname, '../lib/assets/javascripts'),
    libraryTarget: 'umd',
    library: {
      root: 'Tao',
      amd: 'tao',
      commonjs: "tao"
    }
  },
  plugins: [
    new CleanWebpackPlugin(['../lib/assets/stylesheets'], {
      allowExternal: true
    }),
    new CopyWebpackPlugin([{
      from: './styles',
      to: '../stylesheets',
      toType: 'dir',
      force: true
    }])
  ]
});

module.exports = [defaultConfig, railsConfig];
