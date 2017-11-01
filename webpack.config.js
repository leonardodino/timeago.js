/* global __dirname, require, module*/
// https://github.com/krasimir/webpack-library-starter

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');

const libraryName = 'timesince';

const config = {
  entry: __dirname + '/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'timesince.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['es2015'],
        },
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('.')],
    extensions: ['.json', '.js']
  },
  plugins: [new UglifyJsPlugin({minimize: true, sourceMap: true})],
};

module.exports = config;
