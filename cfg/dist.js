'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(), // 检测相似文件，或者文件的冗余内容，然后将冗余内容在output时消除掉
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({    // 在js中可以使用require来引入bower插件
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(), // 压缩输出的js代码
    new webpack.optimize.OccurenceOrderPlugin(), // 按照引用频率，来定义id，引用越频繁，id越小，来减小文件大小
    new webpack.optimize.AggressiveMergingPlugin(), // 优化生成的代码段，合并相似的代码段，提取公共部分的
    new webpack.NoErrorsPlugin() // 保证编译过程中不出错
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
