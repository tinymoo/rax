'use strict';

const webpack = require('webpack');
const colors = require('chalk');

/**
 * Create webpack compiler instance
 *
 * @param  {Object} webpackConfig webpack config
 * @return {compiler}             webpack compiler instance
 *
 * @see http://webpack.github.io/docs/plugins.html#the-compiler-instance
 */
const options = require('./parseOptions');

module.exports = webpackConfig => {
  let compiler = webpack(webpackConfig);

  compiler.plugin('done', stats => {
    if (stats.hasErrors()) {
      return console.log(
        stats.toString({
          colors: true
        })
      );
    }

    console.log(
      stats.toString({
        colors: true,
        chunks: false,
        assets: true
      })
    );
  });

  compiler.plugin('failed', err => {
    throw err;
  });

  return compiler;
};
