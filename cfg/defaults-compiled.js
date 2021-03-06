/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

var path = require('path');
var srcPath = path.join(__dirname, '/../src');
var dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      include: srcPath,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'
    }, {
      test: /\.styl/,
      loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
    }, {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=8192' // 当文件大小小于8k左右时，不返回url地址，直接返回文件base64的值，否则返回url地址。
    }, {
      test: /\.(mp4|ogg|svg)$/,
      loader: 'file-loader'
    }, {
      test: /\.json/,
      loader: 'json-loader'
    }]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/gallary-by-react/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};

//# sourceMappingURL=defaults-compiled.js.map